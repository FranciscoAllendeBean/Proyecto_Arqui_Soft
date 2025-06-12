import React, { useState } from 'react';

const CrearUsuario = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    dni: '',
    user: '',
    password: '',
    role: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setMensaje('Usuario creado con éxito');
        setForm({
          name: '',
          surname: '',
          dni: '',
          user: '',
          password: '',
          role: ''
        });
      } else {
        const data = await response.json();
        setMensaje(data.message || 'Error al crear usuario');
      }
    } catch {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Crear Usuario</h2>
      {mensaje && <p style={{ color: mensaje.includes('éxito') ? 'green' : 'red' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Apellido:</label>
          <input name="surname" value={form.surname} onChange={handleChange} required />
        </div>
        <div>
          <label>DNI:</label>
          <input name="dni" type="number" value={form.dni} onChange={handleChange} required />
        </div>
        <div>
          <label>Usuario:</label>
          <input name="user" value={form.user} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Rol:</label>
          <input name="role" value={form.role} onChange={handleChange} required />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearUsuario;