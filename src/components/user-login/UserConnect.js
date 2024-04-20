import React, { useState } from 'react';
import './userconnect.css';

const UserLogin = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="user-modal">
        <div className='user-modal-w'>
           <div className="user-modal-content">
      
                  <div className="tabs">
                        <button className={`loginBtn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
                        <button className={`signupBtn ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign up</button>
                  </div>
                  {activeTab === 'login' && (
                    <form>
                      <input type="email" placeholder="E-mail" />
                      <input type="password" placeholder="Password" />
                      <button type="submit">Submit</button>
                    </form>
                  )}
                  {activeTab === 'signup' && (
                    <form>
                      <input type="text" placeholder="Username" />
                      <input type="email" placeholder="E-mail" />
                      <input type="password" placeholder="Password" />
                      <button type="submit">Sign up</button>
                    </form>
                  )}
                  <button className="close-btn" onClick={onClose}>Close</button>
          </div>
      </div>
    </div>
  );
};

export default UserLogin;
