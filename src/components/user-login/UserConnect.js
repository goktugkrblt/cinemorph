import React, { useState } from 'react';
import './userconnect.css';

const UserLogin = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginData.username.trim()) {
      errors.username = "Username is required";
    } else if (loginData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    if (!loginData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!loginData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "Email address is invalid";
    }
    setLoginErrors(errors);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!signupData.username.trim()) {
      errors.username = "Username is required";
    } else if (signupData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    if (!signupData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!signupData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = "Email address is invalid";
    }
    setSignupErrors(errors);
  };

  return (
    <div className="user-login-page">
      <div className='user-login-content'>
        <div className="tabs">
          <button className={`loginBtn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
          <button className={`signupBtn ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign up</button>
        </div>
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit}>
          <input type="email" name="email" placeholder="E-mail" value={loginData.email} onChange={handleLoginChange} />
            {loginErrors.email && <span className="error">{loginErrors.email}</span>}
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
            {loginErrors.password && <span className="error">{loginErrors.password}</span>}
            
            <button type="submit">Submit</button>
          </form>
        )}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit}>
            <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupChange} />
            {signupErrors.username && <span className="error">{signupErrors.username}</span>}
            <input type="email" name="email" placeholder="E-mail" value={signupData.email} onChange={handleSignupChange} />
            {signupErrors.email && <span className="error">{signupErrors.email}</span>}
            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
            {signupErrors.password && <span className="error">{signupErrors.password}</span>}
            <button type="submit">Sign up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
