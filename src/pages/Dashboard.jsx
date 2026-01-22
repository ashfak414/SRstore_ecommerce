import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Dashboard</h1>
        <div className="dashboard-content">
          <div className="profile-section">
            <h2>Profile Information</h2>
            <div className="profile-card">
              <div className="profile-avatar">
                {currentUser?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <p><strong>Email:</strong> {currentUser?.email}</p>
                <p><strong>User ID:</strong> {currentUser?.uid}</p>
                <p><strong>Provider:</strong> {currentUser?.providerData?.[0]?.providerId || 'Email/Password'}</p>
              </div>
            </div>
          </div>

          <div className="orders-section">
            <h2>Orders</h2>
            <Link to="/orders" className="view-orders-btn">View Your Orders</Link>
          </div>

          <div className="cart-section">
            <h2>Shopping Cart ({cartItems.length} items)</h2>
            {cartItems.length > 0 ? (
              <div>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <p>Category: {item.category}</p>
                        <p>Price: ${item.price}</p>
                      </div>
                      <div className="cart-item-quantity">
                        <label>Qty:</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        />
                      </div>
                      <div className="cart-item-total">
                        <p className="subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <h3>Cart Total: ${getTotalPrice().toFixed(2)}</h3>
                  <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
                </div>
              </div>
            ) : (
              <p className="no-cart-items">Your cart is empty. <Link to="/">Continue shopping!</Link></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



