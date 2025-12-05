import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p style={{ marginTop: '1rem', color: '#757575' }}>Loading micro frontend...</p>
    </div>
  );
};

export default Loading;
