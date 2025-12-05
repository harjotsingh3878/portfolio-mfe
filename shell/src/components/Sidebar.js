import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/', icon: '📊', label: 'Dashboard', exact: true },
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/transactions', icon: '💳', label: 'Transactions' },
    { path: '/notifications', icon: '🔔', label: 'Notifications' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="collapse-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="mfe-info">
            <h4>Micro Frontends</h4>
            <div className="mfe-status">
              <span className="status-dot online"></span>
              <span>Profile MFE</span>
            </div>
            <div className="mfe-status">
              <span className="status-dot online"></span>
              <span>Transactions MFE</span>
            </div>
            <div className="mfe-status">
              <span className="status-dot online"></span>
              <span>Notifications MFE</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
