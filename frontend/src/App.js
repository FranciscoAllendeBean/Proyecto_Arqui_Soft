import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './login';
import CrearUsuario from './CrearUsuario';
import Actividades from './Actividades';
import CrearActividad from './CrearActividad';
import EditarActividad from './EditarActividad';
import MisActividades from './MisActividades';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Principal" element={<Principal />} />
        <Route path="/login" element={<Pagina1 />} />
        <Route path="/" element={<Login />} />
        <Route path="/Pagina2" element={<CrearUsuario />} />
        <Route path="/Pagina3" element={<Actividades />} />
        <Route path="/Pagina4" element={<CrearActividad />} />
        <Route path="/Pagina5" element={<EditarActividad />} />
        <Route path="/Pagina6" element={<MisActividades />} />
      </Routes>
    </Router>
  );
}

function Pagina1() {
  return (
    <div>
      <h1>Login</h1>
          <nav>
            
          </nav>
      <p>Esta es la primera página.</p>
      <Link to="/Principal">Ir a Página 2</Link>
    </div>
  );
}

function Principal() {
  return (
    <div>
      <h1>Página 2</h1>
      
      <Link to="/Pagina2">Crear Usuario</Link><br/>
      <Link to="/Pagina3">Actividades</Link><br/>
      <Link to="/Pagina4">Crear Actividad</Link><br/>
      <Link to="/Pagina5">Editar Actividad</Link><br/>
      <Link to="/Pagina6">Mis Actividades</Link><br/>

      <Link to="/">Login</Link>
    </div>
  );
}

function Pagina2() {
  return (
    <div>

    </div>
  );
}

function Pagina3() {
  const usuarioId = localStorage.getItem('usuarioId');
  return (
    <div>
      Usuario ID: {usuarioId}
    </div>
  );
}

function Pagina4() {
  return (
    <div>

    </div>
  );
}

function Pagina5() {
  return (
    <div>

    </div>
  );
}

function Pagina6() {
  const usuarioId = localStorage.getItem('usuarioId');
  return <MisActividades usuarioId={usuarioId} />;
}

export default App;