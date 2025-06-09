import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import PacientesCRUD from './components/PacientesCrud';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/header';
import './App.css'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/pacientes"
                element={
                  <ProtectedRoute>
                    <PacientesCRUD />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/pacientes" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
