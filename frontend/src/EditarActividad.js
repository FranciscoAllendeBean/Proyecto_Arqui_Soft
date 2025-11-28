import React, { useEffect, useState } from 'react';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Nombre: '',
    Descripcion: '',
    Dia: '',
    Hora: '',
    Cupo: '',
    Categoria: ''
  });

  useEffect(() => {
    fetchActividades();
  }, []);

  const fetchActividades = async () => {
    try {
      const res = await fetch('http://localhost:8080/actividades/disponibles');
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setActividades(Array.isArray(data) ? data : []);
      setMensaje('');
    } catch (err) {
      console.error('Error fetchActividades:', err);
      setMensaje('No se pudieron cargar las actividades');
    }
  };

  // seleccionar actividad para editar y rellenar formulario
  const seleccionarParaEditar = (actividad) => {
    setEditingId(actividad.Id ?? actividad.id);
    setFormData({
      Nombre: actividad.Nombre ?? actividad.nombre ?? '',
      Descripcion: actividad.Descripcion ?? actividad.descripcion ?? '',
      Dia: actividad.Dia ?? actividad.dia ?? '',
      Hora: actividad.Hora ?? actividad.hora ?? '',
      Cupo: actividad.Cupo ?? actividad.cupo ?? '',
      Categoria: actividad.Categoria ?? actividad.categoria ?? ''
    });
    setMensaje('');
  };

  const cancelarEdicion = () => {
    setEditingId(null);
    setFormData({
      Nombre: '',
      Descripcion: '',
      Dia: '',
      Hora: '',
      Cupo: '',
      Categoria: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // enviar PUT al backend para actualizar
  const guardarCambios = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const token = localStorage.getItem('token'); // si usas auth
      const res = await fetch(`http://localhost:8080/actividades/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          nombre: formData.Nombre,
          descripcion: formData.Descripcion,
          dia: formData.Dia,
          hora: formData.Hora,
          cupo: Number(formData.Cupo),
          categoria: formData.Categoria
        })
      });
      const text = await res.text();
      if (res.ok) {
        setMensaje('Actividad actualizada correctamente');
        await fetchActividades();
        cancelarEdicion();
      } else {
        try {
          const json = JSON.parse(text);
          setMensaje(json.message || `Error ${res.status}`);
        } catch {
          setMensaje(`Error ${res.status}: ${text}`);
        }
      }
    } catch (err) {
      console.error('Error guardarCambios:', err);
      setMensaje('Error de conexión al actualizar actividad');
    }
  };

  const borrarActividad = async (actividadId) => {
    if (!window.confirm('¿Seguro que desea borrar esta actividad?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/actividades/${actividadId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (res.ok) {
        setMensaje('Actividad borrada correctamente');
        await fetchActividades();
        if (editingId === actividadId) cancelarEdicion();
      } else {
        const text = await res.text();
        setMensaje(`Error al borrar: ${text || res.status}`);
      }
    } catch (err) {
      console.error('Error borrarActividad:', err);
      setMensaje('Error de conexión al borrar actividad');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h2>Actividades</h2>
      {mensaje && <p style={{ color: mensaje.toLowerCase().includes('correcta') ? 'green' : 'red' }}>{mensaje}</p>}

      <ul>
        {actividades.map(act => {
          const id = act.Id ?? act.id;
          return (
            <li key={id} style={{ marginBottom: 12 }}>
              <strong>{act.Nombre ?? act.nombre}</strong> — {act.Dia ?? act.dia} {act.Hora ?? act.hora}
              <div style={{ marginTop: 6 }}>
                <button onClick={() => seleccionarParaEditar(act)} style={{ marginRight: 8 }}>Editar</button>
                <button onClick={() => borrarActividad(id)} style={{ backgroundColor: '#c92121', color: 'white' }}>Borrar</button>
              </div>
            </li>
          );
        })}
      </ul>

      {editingId && (
        <form onSubmit={guardarCambios} style={{ marginTop: 20 }}>
          <h3>Editar Actividad (ID: {editingId})</h3>
          <div>
            <label>Nombre:<br />
              <input name="Nombre" value={formData.Nombre} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>Descripción:<br />
              <input name="Descripcion" value={formData.Descripcion} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>Día:<br />
              <input name="Dia" value={formData.Dia} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>Hora:<br />
              <input name="Hora" value={formData.Hora} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>Cupo:<br />
              <input name="Cupo" type="number" value={formData.Cupo} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>Categoría:<br />
              <input name="Categoria" value={formData.Categoria} onChange={handleChange} />
            </label>
          </div>
          <div style={{ marginTop: 8 }}>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={cancelarEdicion} style={{ marginLeft: 8 }}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Actividades;