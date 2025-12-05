import React from 'react';
import { useSelector } from 'react-redux';
import './DashboardHome.css';

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { label: 'Total Balance', value: '$45,678.90', icon: '💰', color: '#4caf50' },
    { label: 'Transactions', value: '156', icon: '💳', color: '#2196f3' },
    { label: 'Pending', value: '3', icon: '⏳', color: '#ff9800' },
    { label: 'Notifications', value: '8', icon: '🔔', color: '#f44336' },
  ];

  return (
    <div className="dashboard-home">
      <div className="welcome-section">
        <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
        <p>Here's your financial overview</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon" style={{ background: `${stat.color}20` }}>
              <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mfe-architecture">
        <h2>🏗️ Micro Frontend Architecture</h2>
        <p>This dashboard demonstrates enterprise-level micro frontend architecture using Webpack 5 Module Federation.</p>
        
        <div className="architecture-cards">
          <div className="arch-card">
            <h3>🎯 Shell Application</h3>
            <ul>
              <li>React 18 with Redux Toolkit</li>
              <li>Webpack 5 Module Federation</li>
              <li>Shared state management</li>
              <li>Dynamic routing</li>
            </ul>
          </div>

          <div className="arch-card">
            <h3>👤 Profile MFE</h3>
            <ul>
              <li>User profile management</li>
              <li>Account settings</li>
              <li>Redux integration</li>
              <li>Port: 3001</li>
            </ul>
          </div>

          <div className="arch-card">
            <h3>💳 Transactions MFE</h3>
            <ul>
              <li>Transaction history</li>
              <li>Real-time updates</li>
              <li>Filtering & search</li>
              <li>Port: 3002</li>
            </ul>
          </div>

          <div className="arch-card">
            <h3>🔔 Notifications MFE</h3>
            <ul>
              <li>Real-time notifications</li>
              <li>Alert management</li>
              <li>Badge updates</li>
              <li>Port: 3003</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="tech-stack">
        <h2>🛠️ Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-badge">React 18</span>
            <span className="tech-badge">Redux Toolkit</span>
            <span className="tech-badge">React Router v6</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">Webpack 5</span>
            <span className="tech-badge">Module Federation</span>
            <span className="tech-badge">Babel</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Express</span>
            <span className="tech-badge">MongoDB</span>
          </div>
          <div className="tech-item">
            <span className="tech-badge">CI/CD</span>
            <span className="tech-badge">Docker</span>
            <span className="tech-badge">GCP Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
