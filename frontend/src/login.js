import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user, password: password })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.message || 'Credenciales inválidas');
        return;
      }
      const data = await res.json();
      const rol = (data.Rol || data.role || '').toString();
      localStorage.setItem('usuarioId', data.usuarioId ?? data.usuarioid ?? '');
      localStorage.setItem('role', rol);
      const token = data.token ?? data.Token ?? data.accessToken ?? data.access_token ?? data.jwt ?? data.tokenJWT;
      if (token) {
        localStorage.setItem('token', token);
      }
      if (rol === 'admin') navigate('/PrincipalAdmin');
      else navigate('/PrincipalUser');
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>usuario:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;