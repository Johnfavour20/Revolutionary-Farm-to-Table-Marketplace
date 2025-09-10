import React from 'react';

const CartSection = ({ cart, updateCartQuantity, removeFromCart, checkout }) => (
  <div className="animate-fade-in">
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
        🛍️ My Shopping Cart
      </h2>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-50">🛒</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Add some fresh produce from the products page!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  From: {item.farmer}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="p-2 text-gray-600 hover:text-green-600 disabled:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                  </button>
                  <span className="px-3 text-lg font-medium">{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
                <div className="text-xl font-bold text-green-700 w-24 text-center">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          ))}
          <div className="border-t-2 border-green-200 pt-6 mt-6">
            <div className="flex justify-between items-center text-2xl font-bold text-gray-800">
              <span>Total:</span>
              <span className="text-green-700">${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
            </div>
          </div>
          <button onClick={checkout} className="w-full py-4 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Checkout
          </button>
        </div>
      )}
    </div>
  </div>
);

export default CartSection;