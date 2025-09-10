import React, { useState } from 'react';

const LoginForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input type="email" name="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" name="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400">
        {loading ? 'Logging In...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;