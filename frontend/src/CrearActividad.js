import React, { useState } from 'react';

const CrearActividad = () => {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    dia: '',
    hora: '',
    cupo: '',
    categoria: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const response = await fetch('http://localhost:8080/actividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setMensaje('Actividad creada con éxito');
        setForm({
          nombre: '',
          descripcion: '',
          dia: '',
          hora: '',
          cupo: '',
          categoria: ''
        });
      } else {
        const data = await response.json();
        setMensaje(data.message || 'Error al crear actividad');
      }
    } catch {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Crear Actividad</h2>
      {mensaje && <p style={{ color: mensaje.includes('éxito') ? 'green' : 'red' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input name="descripcion" value={form.descripcion} onChange={handleChange} required />
        </div>
        <div>
          <label>Día:</label>
          <input name="dia" value={form.dia} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora:</label>
          <input name="hora" value={form.hora} onChange={handleChange} required />
        </div>
        <div>
          <label>Cupo:</label>
          <input name="cupo" type="number" value={form.cupo} onChange={handleChange} required />
        </div>
        <div>
          <label>Categoría:</label>
          <input name="categoria" value={form.categoria} onChange={handleChange} required />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearActividad;