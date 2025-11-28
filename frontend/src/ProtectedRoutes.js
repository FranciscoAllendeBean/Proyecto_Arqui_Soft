import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  
  // si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/" />;
  }

  // verificar si el token está expirado (decodificar JWT)
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // decodificar payload
    const exp = payload.exp * 1000; // convertir a milisegundos
    if (Date.now() > exp) {
      // token expirado
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioId');
      localStorage.removeItem('rol');
      return <Navigate to="/" />;
    }
  } catch (err) {
    console.error('Error al verificar token:', err);
    localStorage.removeItem('token');
    return <Navigate to="/Login" />;
  }

  // token válido, renderizar componente
  return element;
};

export default ProtectedRoute;