import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        formData
      );

      if (response.status === 200) {
        // Successfully logged in
        // You can redirect the user or perform other actions here
        console.log('Logged in successfully');
      }
    } catch (error) {
      // Handle login failure
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
