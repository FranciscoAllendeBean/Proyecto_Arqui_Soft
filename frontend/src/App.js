import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Principal" element={<Principal />} />
        <Route path="/login" element={<Pagina1 />} />
        <Route path="/" element={<Login />} />
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
      <p>Esta es la segunda página.</p>
      <Link to="/">Login</Link>
    </div>
  );
}

export default App;