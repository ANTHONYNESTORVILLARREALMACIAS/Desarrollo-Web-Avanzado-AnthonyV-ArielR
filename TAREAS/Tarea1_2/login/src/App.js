import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* Ruta principal para el formulario de Login y Registro */}
        <Route path="/" element={<LoginRegister />} />
        {/* Puedes añadir más rutas aquí si necesitas otras páginas */}
      </Routes>
    </Router>
  );
};

export default App;