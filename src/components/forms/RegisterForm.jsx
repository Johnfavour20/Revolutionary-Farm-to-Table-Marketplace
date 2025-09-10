import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'buyer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" name="password" id="password" required value={formData.password} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
      </div>
      <div>
        <label htmlFor="userType" className="block text-sm font-medium text-gray-700">I am a...</label>
        <select name="userType" id="userType" value={formData.userType} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200">
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400">
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;