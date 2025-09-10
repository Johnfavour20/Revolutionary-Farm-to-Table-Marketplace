import React, { useState } from 'react';

const SellForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: ''
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" id="description" required value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200"></textarea>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input type="number" name="price" id="price" required min="0" step="0.01" value={formData.price} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" name="quantity" id="quantity" required min="1" value={formData.quantity} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200" />
        </div>
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select name="category" id="category" required value={formData.category} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 p-2.5 transition-all duration-200">
          <option value="">Select a category</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="grains">Grains</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" disabled={loading} className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400">
        {loading ? 'Submitting...' : 'List Produce'}
      </button>
    </form>
  );
};

export default SellForm;