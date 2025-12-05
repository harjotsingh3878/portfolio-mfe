import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { toggleTheme } from '../store/themeSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">🏦 Banking Dashboard</h1>
        <span className="subtitle">Enterprise Micro Frontend Architecture</span>
      </div>
      
      <div className="header-right">
        <button 
          className="theme-toggle"
          onClick={() => dispatch(toggleTheme())}
          title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? '🌙' : '☀️'}
        </button>
        
        <div className="user-info">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-role">{user?.role || 'Customer'}</span>
          </div>
        </div>
        
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
