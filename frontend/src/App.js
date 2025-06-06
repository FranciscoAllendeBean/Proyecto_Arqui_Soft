import logo from './logo.svg';
import './App.css';
import Login from './login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <nav>
            <Link to="/login">Login</Link><br/>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
