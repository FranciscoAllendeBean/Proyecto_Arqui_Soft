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

  // Función para inscribirse
  const inscribirse = async (actividadId) => {
    const usuarioId = localStorage.getItem('usuarioId'); // Asegúrate de guardar el usuarioId al hacer login
    if (!usuarioId) {
      setMensaje('Debes iniciar sesión para inscribirte');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/inscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actividadid: actividadId,
          usuarioid: usuarioId,
          fecha: new Date().toISOString().slice(0, 10)
        })
      });
      if (response.ok) {
        setMensaje('Inscripción exitosa');
      } else {
        const data = await response.json();
        setMensaje(data.message || 'No se pudo inscribir');
      }
    } catch {
      setMensaje('Error al conectar con el servidor');
    }
  };

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
      {mensaje && <p style={{ color: mensaje.includes('exitosa') ? 'green' : 'red' }}>{mensaje}</p>}
      <ul>
        {actividadesFiltradas.map(act => (
          <li key={act.id}>
            <strong>{act.nombre}</strong> - {act.descripcion} <br />
            ID: {act.id} | Día: {act.dia} | Hora: {act.hora} | Cupo: {act.cupo} | Categoría: {act.categoria}
            <button style={{ marginLeft: 10 }} onClick={() => inscribirse(act.id)}>
              Inscribirse
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actividades;