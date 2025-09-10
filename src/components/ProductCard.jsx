import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, categoryInfo }) => (
  <div className={`relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
    <Link to={`/products/${product.id}`} className="block">
      <div className={`p-6 ${categoryInfo.bgColor} border-b-4 ${categoryInfo.borderColor} flex items-center justify-between`}>
        <span className={`text-4xl`}>{categoryInfo.emoji}</span>
        <span className={`text-sm font-semibold uppercase px-3 py-1 rounded-full ${categoryInfo.textColor} ${categoryInfo.bgColor} border-2 ${categoryInfo.borderColor}`}>
          {product.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-700">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.quantity}
          </span>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <span className="font-semibold text-gray-700">Farmer:</span> {product.farmer}
        </div>
      </div>
    </Link>
    <div className="p-6 border-t border-gray-200">
      <button
        onClick={() => onAddToCart(product.id)}
        className={`w-full px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 shadow-md ${
          product.quantity > 0
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={product.quantity === 0}
      >
        {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  </div>
);

export default ProductCard;