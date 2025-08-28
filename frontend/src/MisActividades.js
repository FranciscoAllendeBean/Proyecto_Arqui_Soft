import React, { useEffect, useState } from 'react';

const MisActividades = () => {
  const usuarioId = localStorage.getItem('usuarioId');
  const [actividades, setActividades] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!usuarioId) {
      setMensaje('No hay usuario autenticado');
      return;
    }
    fetch(`http://localhost:8080/usuarios/${usuarioId}/actividades`)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar actividades');
        return res.json();
      })
      .then(data => setActividades(data))
      .catch(() => setMensaje('No se pudieron cargar tus actividades'));
  }, [usuarioId]);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Mis Actividades Inscritas</h2>
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
      <ul>
        {actividades.map(act => (
          <li key={act.id}>
            <strong>{act.nombre}</strong> - {act.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisActividades;