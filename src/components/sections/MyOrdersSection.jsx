import React from 'react';

const MyOrdersSection = ({ orders }) => (
  <div className="animate-fade-in">
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
        📋 My Orders
      </h2>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-50">📦</div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No orders placed yet</h3>
          <p className="text-gray-500">Once you place an order, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center border-b pb-3 mb-3 border-gray-200">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Order ID: #{order.id}</h4>
                  <p className="text-sm text-gray-500">Date: {order.orderDate}</p>
                </div>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {order.status}
                </div>
              </div>
              <ul className="space-y-2">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between items-center text-gray-600">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t-2 border-green-300 pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-green-700">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default MyOrdersSection;