import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './header.css';
import '../App.css';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getUserInitials = (username: string = '') => {
    return username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div style={{ position: 'relative' }}>
            <img src="/paw-icon.svg" alt="Logo Clínica Veterinaria" className="logo" />
            <div className="status-indicator"></div>
          </div>
          <h1>Cisco Clinical Veterinaria</h1>
        </div>
        
        {isAuthenticated && (
          <div className="header-right">
            <div className="user-info">
              <span>Bienvenido, {user?.username || 'Admin'}</span>
              <span className="separator">•</span>
              <span className="time">{getCurrentTime()}</span>
            </div>
            
            <div className="user-avatar" title={user?.username}>
              {getUserInitials(user?.username)}
            </div>
            
            <button 
              className="logout-button" 
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Cerrar sesión"
            >
              <span className="logout-icon">
                {isLoggingOut ? '⏳' : '🚪'}
              </span>
              <span>{isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import './header.css';
// import '../App.css';

// const Header = () => {
//   const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header className="header">
//       <div className="header-content">
//         <div className="header-left">
//           <img src="/paw-icon.svg" alt="Logo" className="logo" />
//           <h1>Clínica Veterinaria</h1>
//         </div>
//         {isAuthenticated && (
//           <div className="header-right">
//             <button className="logout-button" onClick={handleLogout}>
//               Cerrar sesión
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;