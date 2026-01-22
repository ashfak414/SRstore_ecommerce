import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="https://img.freepik.com/premium-vector/sr-letter-logo-design-black-background-initial-monogram-letter-sr-logo-design-vector-template_628456-11.jpg" className="h-10 w-10" alt="SR Logo" />
          <span className="text-xl sm:text-2xl font-bold text-gray-900">SR</span>
        </Link>

        {/* Desktop Menu + Cart */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
          
          {currentUser && (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">Dashboard</Link>
              <Link to="/orders" className="text-gray-700 hover:text-blue-600 font-medium transition">Orders</Link>
              <Link to="/admin" className="text-yellow-600 hover:text-yellow-700 font-medium transition">⚙️ Admin</Link>
            </>
          )}
        </div>

        {/* Right Side - Cart + Auth */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <div className="relative">
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition"
              title="Shopping Cart"
            >
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 6.293A1 1 0 006 21h12a1 1 0 00.293-1.707L17 13M17 13l2-8m-2 8v4m-6-4v4" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Cart Dropdown Modal */}
            {showCart && (
              <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-30">
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
                    <button 
                      onClick={() => setShowCart(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                  
                  {cartItems.length > 0 ? (
                    <>
                      <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100">
                            <img src={item.image} alt={item.title} className="w-12 h-12 object-contain bg-gray-50 rounded" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.title}</p>
                              <p className="text-xs text-gray-500">${item.price} × {item.quantity}</p>
                              <p className="text-sm font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition"
                              title="Remove from cart"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-100 pt-4 space-y-3">
                        <div className="flex justify-between items-center font-bold text-gray-900">
                          <span>Total:</span>
                          <span className="text-blue-600">${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <Link 
                          to="/dashboard" 
                          onClick={() => setShowCart(false)}
                          className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition"
                        >
                          View Cart
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-gray-600 mb-3">Your cart is empty</p>
                      <Link 
                        to="/" 
                        onClick={() => setShowCart(false)}
                        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden sm:flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
            {currentUser ? (
              <>
                <span className="text-sm text-gray-600 hidden lg:inline">{currentUser.email.split('@')[0]}</span>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium transition text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition text-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white py-1.5 px-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition">Contact</Link>
            
            {currentUser ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition">Dashboard</Link>
                <Link to="/orders" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition">Orders</Link>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-yellow-600 hover:bg-yellow-50 rounded-lg transition font-medium">⚙️ Admin</Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <p className="py-2 px-3 text-sm text-gray-600">{currentUser.email}</p>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded-lg transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

