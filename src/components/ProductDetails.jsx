import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryInfo } from '../utils/categoryInfo';

const ProductDetails = ({ products, onAddToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(productId));
  const categoryInfo = product ? getCategoryInfo(product.category) : {};

  if (!product) {
    return (
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 text-center shadow-xl border border-green-200 animate-fade-in">
        <div className="text-6xl mb-4 opacity-50">🔍</div>
        <h3 className="text-2xl font-bold text-gray-600 mb-2">Product Not Found</h3>
        <p className="text-gray-500 mb-4">The product you are looking for does not exist.</p>
        <button onClick={() => navigate(-1)} className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 font-medium">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <img src={product.images[0]} alt={product.name} className="w-full h-auto rounded-2xl shadow-lg border border-gray-200" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`text-4xl`}>{categoryInfo.emoji}</span>
            <span className={`text-sm font-semibold uppercase px-3 py-1 rounded-full ${categoryInfo.textColor} ${categoryInfo.bgColor} border-2 ${categoryInfo.borderColor}`}>
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-green-700 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.details}</p>
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-semibold text-gray-700">Farmer:</span> {product.farmer}
          </div>
          <div className="text-sm text-gray-500 mb-6">
            <span className="font-semibold text-gray-700">Stock:</span> {product.quantity}
          </div>
          <button
            onClick={() => onAddToCart(product.id)}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg ${
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
    </div>
  );
};

export default ProductDetails;