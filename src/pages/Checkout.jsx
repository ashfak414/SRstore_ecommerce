import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart, updateQuantity } = useCart();
  const { currentUser } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  // Auto-fill user information from Firebase
  useEffect(() => {
    if (currentUser?.email) {
      const emailName = currentUser.email.split('@')[0];
      setFormData((prev) => ({
        ...prev,
        email: currentUser.email,
        firstName: prev.firstName || emailName.charAt(0).toUpperCase() + emailName.slice(1),
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^[+\d\s()\-]{10,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      setErrors({ cart: 'Your cart is empty' });
      return;
    }

    setLoading(true);

    try {
      // Simulate order submission
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        items: cartItems,
        total: getTotalPrice(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: 'Pending',
      };

      console.log('Order submitted:', orderData);
      
      // Save order to OrdersContext
      addOrder(orderData);
      
      // Save order to localStorage as backup
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart
      clearCart();
      
      // Redirect to confirmation page with order data
      navigate('/order-confirmation', { state: { orderData } });
    } catch (error) {
      setErrors({ submit: 'Error placing order. Please try again.' });
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart-message">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checkout</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-info">
                    <p className="item-name">{item.title}</p>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <p className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form-wrapper">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>Shipping Information</h2>
              {errors.submit && <div className="error-alert">{errors.submit}</div>}
              {errors.cart && <div className="error-alert">{errors.cart}</div>}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={errors.firstName ? 'input-error' : ''}
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={errors.lastName ? 'input-error' : ''}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={errors.phone ? 'input-error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className={errors.city ? 'input-error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className={errors.zipCode ? 'input-error' : ''}
                  />
                  {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="United States"
                    className={errors.country ? 'input-error' : ''}
                  />
                  {errors.country && <span className="error-text">{errors.country}</span>}
                </div>
              </div>

              <div className="form-actions">
                <Link to="/dashboard" className="back-btn">← Back to Cart</Link>
                <button 
                  type="submit" 
                  className="place-order-btn"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
