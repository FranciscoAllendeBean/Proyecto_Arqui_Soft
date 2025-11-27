import React, { useEffect, useState } from 'react';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/actividades/disponibles')
      .then(res => res.json())
      .then(data => setActividades(data || []))
      .catch(() => setMensaje('No se pudieron cargar las actividades'));
  }, []);

  const inscribirse = async (actividadId) => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) { setMensaje('Debes iniciar sesión para inscribirte'); return; }
    try {
      const response = await fetch('http://localhost:8080/inscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Actividadid: Number(actividadId),
          Usuarioid: Number(usuarioId),
          Fecha: new Date().toISOString().slice(0, 10)
        })
      });
      if (response.ok) setMensaje('Inscripción exitosa');
      else {
        const data = await response.json().catch(() => ({}));
        setMensaje(data.message || 'No se pudo inscribir');
      }
    } catch {
      setMensaje('Error al conectar con el servidor');
    }
  };

  // filtro: id, nombre, día, hora (soporta respuestas con distintas mayúsculas)
  const q = busquedaId.trim().toLowerCase();
  const actividadesFiltradas = !q
    ? actividades
    : actividades.filter(act => {
        const idStr = String(act.id ?? act.Id ?? '').toLowerCase();
        const nombre = String(act.nombre ?? act.Nombre ?? '').toLowerCase();
        const dia = String(act.dia ?? act.Dia ?? '').toLowerCase();
        const hora = String(act.hora ?? act.Hora ?? '').toLowerCase();
        return idStr.includes(q) || nombre.includes(q) || dia.includes(q) || hora.includes(q);
      });

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Actividades disponibles</h2>
      <input
        type="text"
        placeholder="Buscar por ID, nombre, día u hora..."
        value={busquedaId}
        onChange={e => setBusquedaId(e.target.value)}
        style={{ marginBottom: 10, width: '100%' }}
      />
      {mensaje && <p style={{ color: mensaje.includes('exitosa') ? 'green' : 'red' }}>{mensaje}</p>}
      <ul>
        {actividadesFiltradas.map(act => (
          <li key={act.Id ?? act.id}>
            <strong>{act.Nombre ?? act.nombre}</strong> - {act.Descripcion ?? act.descripcion} <br />
            Día: {act.Dia ?? act.dia} | Hora: {act.Hora ?? act.hora} | Cupo: {act.Cupo ?? act.cupo} | Categoría: {act.Categoria ?? act.categoria}
            <div>
              <button onClick={() => inscribirse(act.Id ?? act.id)}>Inscribirse</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actividades;