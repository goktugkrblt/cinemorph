import React from 'react';
import './userconnect.css'

const UserLogin = ({ onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="user-modal">
      <div className="user-modal-content">
        <h2>User Login</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserLogin;
