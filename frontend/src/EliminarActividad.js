import React, { useEffect, useState } from 'react';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/actividades/disponibles')
      .then(res => res.json())
      .then(data => setActividades(data || []))
      .catch(() => setMensaje('No se pudieron cargar las actividades'));
  }, []);

  const borrarActividad = async (actividadId) => {
    if (!window.confirm('¿Seguro que desea borrar esta actividad?')) return;
    try {
      console.log('Borrando actividad id=', actividadId);
      const res = await fetch(`http://localhost:8080/actividades/${actividadId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const texto = await res.text();
      console.log('Respuesta DELETE:', res.status, texto);
      if (res.ok) {
        setMensaje('Actividad borrada correctamente');
        setActividades(actividades.filter(a => (a.Id ?? a.id) !== actividadId));
      } else {
        // intentar parsear JSON con mensaje de error
        try {
          const json = JSON.parse(texto);
          setMensaje(json.message || `Error ${res.status}`);
        } catch {
          setMensaje(`Error ${res.status}: ${texto}`);
        }
      }
    } catch (err) {
      console.error('Error al borrar actividad:', err);
      setMensaje('Error de conexión al borrar actividad');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <h2>Actividades Disponibles</h2>
      {mensaje && <p style={{ color: mensaje.includes('correcta') ? 'green' : 'red' }}>{mensaje}</p>}
      <ul>
        {actividades.map(act => {
          const id = act.Id ?? act.id;
          return (
            <li key={id} style={{ marginBottom: 12 }}>
              <strong>{act.Nombre ?? act.nombre}</strong><br />
              {act.Descripcion ?? act.descripcion}<br />
              Día: {act.Dia ?? act.dia} | Hora: {act.Hora ?? act.hora}
              <div style={{ marginTop: 6 }}>
                <button
                  onClick={() => borrarActividad(id)}
                  style={{ backgroundColor: '#c92121', color: 'white', border: 'none', padding: '6px 10px', cursor: 'pointer' }}
                >
                  Borrar actividad
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Actividades;