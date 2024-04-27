import React, { useState } from 'react';
import './userconnect.css';

const UserLogin = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);

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
    }
    if (!loginData.password.trim()) {
      errors.password = "Password is required";
    }
    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      const storedUserData = JSON.parse(localStorage.getItem('signupData'));
      if (storedUserData && storedUserData.username === loginData.username && storedUserData.password === loginData.password) {
        setLoggedInUser(loginData);
      } else {
        setLoginErrors({ general: "Invalid username or password" });
      }
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!signupData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!signupData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!signupData.email.trim()) {
      errors.email = "Email is required";
    }
    setSignupErrors(errors);

    if (Object.keys(errors).length === 0) {
      localStorage.setItem('signupData', JSON.stringify(signupData));
      setLoggedInUser(signupData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <div className="user-login-page">
      <div className='user-login-content'>
        {!loggedInUser ? (
          <div>
            <div className="tabs">
              <button className={`loginBtn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
              <button className={`signupBtn ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign up</button>
            </div>
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit}>
                <input type="text" name="username" placeholder="Username" value={loginData.username} onChange={handleLoginChange} />
                {loginErrors.username && <span className="error">{loginErrors.username}</span>}
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
                {loginErrors.password && <span className="error">{loginErrors.password}</span>}
                {loginErrors.general && <span className="error">{loginErrors.general}</span>}
                <button type="submit">Login</button>
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
        ) : (
          <div>
            <p>Welcome, {loggedInUser.username}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
