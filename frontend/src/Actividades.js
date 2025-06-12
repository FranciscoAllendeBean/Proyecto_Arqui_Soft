import React, { useEffect, useState } from 'react';

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [busquedaId, setBusquedaId] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/actividades/disponibles')
      .then(res => res.json())
      .then(data => setActividades(data))
      .catch(() => setMensaje('No se pudieron cargar las actividades'));
  }, []);

  // Filtrar por ID si hay algo en el input
  const actividadesFiltradas = busquedaId
    ? actividades.filter(act => String(act.id) === busquedaId)
    : actividades;

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Actividades disponibles</h2>
      <input
        type="text"
        placeholder="Buscar por ID..."
        value={busquedaId}
        onChange={e => setBusquedaId(e.target.value)}
        style={{ marginBottom: 10, width: '100%' }}
      />
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
      <ul>
        {actividadesFiltradas.map(act => (
          <li key={act.id}>
            <strong>{act.nombre}</strong> - {act.descripcion} <br />
            ID: {act.id} | Día: {act.dia} | Hora: {act.hora} | Cupo: {act.cupo} | Categoría: {act.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actividades;