import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './header.css';
import '../App.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <img src="/paw-icon.svg" alt="Logo" className="logo" />
          <h1>Clínica Veterinaria</h1>
        </div>
        {isAuthenticated && (
          <div className="header-right">
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;