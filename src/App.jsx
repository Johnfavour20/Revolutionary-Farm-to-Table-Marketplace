import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

// Import all components
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import { SellForm, LoginForm, RegisterForm } from './components/forms';
import { CartSection, MyOrdersSection } from './components/sections';
import { getCategoryInfo } from './utils/categoryInfo';

// =========================================================================
// Main App Component
// =========================================================================

const FarmFreshMarketplace = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    loadProducts();
    loadUserSession();
    loadCart();
    loadOrders();
  }, []);

  const loadUserSession = () => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  };

  const getSampleProducts = () => {
    return [
      { id: 1, name: "Fresh Organic Tomatoes", category: "vegetables", price: 3.50, quantity: 50, description: "Locally grown organic tomatoes, perfect for salads and cooking", farmer: "John Smith Farm", images: ["https://images.unsplash.com/photo-1599424855598-17a42828b184?w=500&auto=format&fit=crop"], details: "These heirloom tomatoes are grown without any pesticides or chemical fertilizers. They have a rich, complex flavor, ideal for sauces, salads, and sandwiches." },
      { id: 2, name: "Sweet Red Apples", category: "fruits", price: 2.80, quantity: 100, description: "Crispy and sweet red apples, great for snacking", farmer: "Green Valley Orchards", images: ["https://images.unsplash.com/photo-1576402117562-b9e719129532?w=500&auto=format&fit=crop"], details: "Harvested at the peak of ripeness, these apples are juicy, crisp, and naturally sweet. A perfect addition to your daily diet." },
      { id: 3, name: "Farm Fresh Milk", category: "dairy", price: 4.20, quantity: 25, description: "Pure farm fresh milk from grass-fed cows", farmer: "Dairy Dreams Farm", images: ["https://images.unsplash.com/photo-1563223192-d6520ed4e040?w=500&auto=format&fit=crop"], details: "Sourced from a small, family-owned farm, this milk is non-homogenized and has a rich, creamy flavor. Our cows are grass-fed and treated with care." },
      { id: 4, name: "Organic Carrots", category: "vegetables", price: 2.10, quantity: 75, description: "Fresh organic carrots, great source of beta-carotene", farmer: "Earth's Bounty Farm", images: ["https://images.unsplash.com/photo-1598170258074-6816001099f7?w=500&auto=format&fit=crop"], details: "These carrots are hand-picked and have a beautiful vibrant color. Their natural sweetness makes them a favorite for juicing, roasting, or snacking." },
      { id: 5, name: "Golden Bananas", category: "fruits", price: 1.80, quantity: 120, description: "Sweet golden bananas, rich in potassium", farmer: "Tropical Fruits Co.", images: ["https://images.unsplash.com/photo-1589255621419-7c40d172e9d2?w=500&auto=format&fit=crop"], details: "Our bananas are grown in tropical climates, picked and shipped at the perfect stage for ripening. A healthy and convenient snack for any time of day." },
      { id: 6, name: "Fresh Spinach", category: "vegetables", price: 2.50, quantity: 40, description: "Nutrient-rich fresh spinach, perfect for smoothies", farmer: "Green Leaf Gardens", images: ["https://images.unsplash.com/photo-1601625805561-1e9d233c46e0?w=500&auto=format&fit=crop"], details: "A versatile leafy green packed with iron and vitamins. Our spinach is grown in open fields, giving it a crisp texture and deep flavor, perfect for salads, sautés, or smoothies." },
      { id: 7, name: "Organic Eggs", category: "dairy", price: 5.00, quantity: 60, description: "Free-range organic eggs from happy hens", farmer: "Happy Hen Farm", images: ["https://images.unsplash.com/photo-1599548454276-f3ce59902633?w=500&auto=format&fit=crop"], details: "Our free-range chickens are fed a non-GMO diet, producing eggs with vibrant orange yolks and superior flavor. A breakfast staple you can feel good about." },
      { id: 8, name: "Sweet Corn", category: "vegetables", price: 3.20, quantity: 80, description: "Fresh sweet corn, perfect for grilling", farmer: "Sunny Fields Farm", images: ["https://images.unsplash.com/photo-1603565017581-67856d5e0649?w=500&auto=format&fit=crop"], details: "Harvested at its peak, this sweet corn is tender and bursting with flavor. Perfect for grilling, boiling, or cutting off the cob for salads and salsas." }
    ];
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setProducts(getSampleProducts());
      }
    } catch (error) {
      setProducts(getSampleProducts());
    }
    setLoading(false);
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const addToCart = (productId) => {
    if (!currentUser) {
      showAlert('Please login to add items to cart', 'error');
      navigate('/login');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        farmer: product.farmer || 'Local Farm'
      }];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showAlert('Product added to cart! 🎉', 'success');
  };

  const updateCartQuantity = (productId, newQuantity) => {
    const newCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ).filter(item => item.quantity > 0);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showAlert('Cart updated!', 'success');
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showAlert('Item removed from cart', 'success');
  };

  const checkout = () => {
    if (!currentUser) {
      showAlert('Please login to checkout', 'error');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      showAlert('Your cart is empty', 'error');
      return;
    }

    const order = {
      id: Date.now(),
      userId: currentUser.id,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0]
    };

    const newOrders = [...orders, order];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));

    setCart([]);
    localStorage.removeItem('cart');
    showAlert('🎉 Order placed successfully! Thank you for your purchase!', 'success');
    navigate('/orders');
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showAlert(`🎉 Welcome back, ${userData.firstName}!`, 'success');
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      // Fallback for when backend is not running
      const demoUser = { id: Date.now(), email: email, firstName: 'Demo', lastName: 'User', userType: 'buyer' };
      setCurrentUser(demoUser);
      localStorage.setItem('currentUser', JSON.stringify(demoUser));
      showAlert('🎉 Demo login successful!', 'success');
      navigate('/');
    }
    setLoading(false);
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        showAlert('🎉 Registration successful! Please login.', 'success');
        navigate('/login');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      // Fallback for when backend is not running
      showAlert(`🎉 Demo registration for ${userData.firstName} successful! Please login.`, 'success');
      navigate('/login');
    }
    setLoading(false);
  };

  const addProduct = async (productData) => {
    if (!currentUser) {
      showAlert('Please login to list products', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const newProduct = {
        id: Date.now(),
        ...productData,
        farmer: `${currentUser.firstName} ${currentUser.lastName}`,
        farmerId: currentUser.id
      };
      setProducts([...products, newProduct]);
      showAlert('🎉 Product listed successfully!', 'success');
    } catch (error) {
      showAlert('Failed to list product', 'error');
    }
    setLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCart([]);
    localStorage.removeItem('cart');
    showAlert('👋 Logged out successfully!', 'success');
    navigate('/');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getCategoryInfo = (category) => {
    const info = {
      fruits: {
        emoji: '🍎',
        bgColor: 'bg-red-50',
        textColor: 'text-red-600',
        borderColor: 'border-red-200',
        gradientFrom: 'from-red-400',
        gradientTo: 'to-orange-400'
      },
      vegetables: {
        emoji: '🥕',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-600',
        borderColor: 'border-orange-200',
        gradientFrom: 'from-orange-400',
        gradientTo: 'to-amber-400'
      },
      dairy: {
        emoji: '🥛',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-200',
        gradientFrom: 'from-blue-400',
        gradientTo: 'to-cyan-400'
      },
      grains: {
        emoji: '🌾',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-600',
        borderColor: 'border-yellow-200',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-amber-400'
      }
    };
    return info[category] || {
      emoji: '🌱',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      gradientFrom: 'from-green-400',
      gradientTo: 'to-emerald-400'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
              <span className="text-green-600">🌱</span>
              <span>FarmFresh Market</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { path: '/', icon: '🏠', label: 'Home' },
                { path: '/products', icon: '🛒', label: 'Products' },
                { path: '/sell', icon: '➕', label: 'Sell Produce' },
                { path: '/orders', icon: '📋', label: 'My Orders' },
                { path: '/cart', icon: '🛍️', label: `Cart (${cartItemCount})` }
              ].map(({ path, icon, label }) => (
                <Link key={path} to={path} className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  window.location.pathname === path
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}>
                  <span>{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-3">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <span className="text-green-700 font-medium">Welcome, {currentUser.firstName}! 👋</span>
                  <button onClick={logout} className="px-4 py-2 text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 font-medium">Logout</button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 font-medium">Login</Link>
                  <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Register</Link>
                </>
              )}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-green-200">
              <div className="flex flex-col space-y-3">
                {[
                  { path: '/', icon: '🏠', label: 'Home' },
                  { path: '/products', icon: '🛒', label: 'Products' },
                  { path: '/sell', icon: '➕', label: 'Sell Produce' },
                  { path: '/orders', icon: '📋', label: 'My Orders' },
                  { path: '/cart', icon: '🛍️', label: `Cart (${cartItemCount})` }
                ].map(({ path, icon, label }) => (
                  <Link key={path} to={path} onClick={() => setMobileMenuOpen(false)} className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${window.location.pathname === path ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'}`}>
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                ))}
                <div className="pt-3 border-t border-green-200">
                  {currentUser ? (
                    <div className="space-y-3">
                      <div className="text-green-700 font-medium px-3">Welcome, {currentUser.firstName}! 👋</div>
                      <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full px-4 py-2 text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 font-medium">Logout</button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full px-4 py-2 text-center text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 font-medium">Login</Link>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full px-4 py-2 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium">Register</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Alert */}
      {alert && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className={`p-4 rounded-lg shadow-lg animate-fade-in ${alert.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'}`}>
            <div className="flex items-center">
              <span className="mr-2 text-xl">{alert.type === 'success' ? '✅' : '⚠️'}</span>
              <span className="font-medium">{alert.message}</span>
              <button onClick={() => setAlert(null)} className="ml-auto text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={
            <div className="space-y-12 animate-fade-in">
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 lg:p-12 text-center shadow-xl border border-green-200">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent mb-6">
                    🌱 Revolutionary Farm-to-Table Marketplace
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Connect directly with local farmers and get the freshest perishable produce delivered to your doorstep. Reducing post-harvest losses while maximizing farmer profits.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/products" className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      🛒 Shop Fresh Produce
                    </Link>
                    <Link to="/sell" className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200 font-semibold">
                      🌱 Start Selling
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: '🌱', number: products.length, label: 'Fresh Products', color: 'from-green-400 to-emerald-500' },
                  { icon: '👨‍🌾', number: '12+', label: 'Active Farmers', color: 'from-blue-400 to-cyan-500' },
                  { icon: '🚚', number: '45+', label: 'Orders Delivered', color: 'from-purple-400 to-pink-500' },
                  { icon: '💰', number: '$2.5K+', label: 'Revenue Generated', color: 'from-yellow-400 to-orange-500' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
                  🌟 Featured Fresh Produce
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.slice(0, 3).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      categoryInfo={getCategoryInfo(product.category)}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            </div>
          } />
          <Route path="/products" element={
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
                  🛒 Browse All Products
                </h2>
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                  <div className="flex-1">
                    <div className="relative">
                      <input type="text" placeholder="Search for fresh produce..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200" />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">🔍</div>
                    </div>
                  </div>
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 min-w-48">
                    <option value="">All Categories</option>
                    <option value="fruits">🍎 Fruits</option>
                    <option value="vegetables">🥕 Vegetables</option>
                    <option value="dairy">🥛 Dairy</option>
                    <option value="grains">🌾 Grains</option>
                  </select>
                </div>
                {loading ? (
                  <div className="text-center py-12"><div className="inline-block w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div><div className="text-green-600 font-medium">Loading amazing products...</div></div>
                ) : (
                  <>
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-12"><div className="text-6xl mb-4 opacity-50">🔍</div><h3 className="text-2xl font-bold text-gray-600 mb-2">No products found</h3><p className="text-gray-500">Try adjusting your search criteria or browse all categories.</p></div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                          <ProductCard key={product.id} product={product} categoryInfo={getCategoryInfo(product.category)} onAddToCart={addToCart} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          } />
          <Route path="/sell" element={
            <div className="animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200">
                  <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">📦 List Your Fresh Produce</h2>
                  <SellForm onSubmit={addProduct} loading={loading} />
                </div>
              </div>
            </div>
          } />
          <Route path="/cart" element={<CartSection cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} checkout={checkout} />} />
          <Route path="/orders" element={<MyOrdersSection orders={orders} />} />
          <Route path="/login" element={
            <div className="animate-fade-in">
              <div className="max-w-xl mx-auto">
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200">
                  <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">👋 Welcome Back!</h2>
                  <LoginForm onSubmit={login} loading={loading} />
                </div>
              </div>
            </div>
          } />
          <Route path="/register" element={
            <div className="animate-fade-in">
              <div className="max-w-xl mx-auto">
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-green-200">
                  <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">📝 Join FarmFresh</h2>
                  <RegisterForm onSubmit={register} loading={loading} />
                </div>
              </div>
            </div>
          } />
          <Route path="/products/:productId" element={<ProductDetails products={products} onAddToCart={addToCart} />} />
        </Routes>
      </main>
      <footer className="bg-white/80 backdrop-blur-lg border-t border-green-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2025 FarmFresh Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default () => (
  <Router>
    <FarmFreshMarketplace />
  </Router>
);