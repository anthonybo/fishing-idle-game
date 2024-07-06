import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, { username, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      toast.success(isRegistering ? 'Registration successful!' : 'Login successful!');
    } catch (error) {
      console.error('Authentication failed', error);
      toast.error(error.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <Button type="submit" className="w-full mb-2">
          {isRegistering ? 'Register' : 'Login'}
        </Button>
        <Button 
          type="button" 
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full"
        >
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </Button>
      </form>
    </div>
  );
};

export default Login;