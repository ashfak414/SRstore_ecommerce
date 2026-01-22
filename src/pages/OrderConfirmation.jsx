import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order data from location state
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
      setLoading(false);
    } else {
      // Try to get from localStorage as fallback
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        setOrderData(JSON.parse(savedOrder));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [location]);

  if (loading) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-loading">Loading confirmation...</div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="confirmation-container">
        <div className="no-order">
          <h2>No Order Found</h2>
          <p>Please complete your order first</p>
          <Link to="/" className="home-link">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-wrapper">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p className="success-message">Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <div className="confirmation-content">
          {/* Order Info */}
          <div className="order-info-card">
            <h2>Order Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Order ID:</label>
                <p className="order-id">{orderData.orderId}</p>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className="status-badge pending">{orderData.status}</span>
              </div>
              <div className="info-item">
                <label>Order Date:</label>
                <p>{orderData.date} at {orderData.time}</p>
              </div>
              <div className="info-item">
                <label>Total Amount:</label>
                <p className="total-amount">${orderData.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="customer-info-card">
            <h2>Customer Information</h2>
            <div className="info-section">
              <h3>Billing & Shipping Address</h3>
              <p>
                <strong>{orderData.customer.firstName} {orderData.customer.lastName}</strong><br />
                {orderData.shippingAddress.address}<br />
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}<br />
                {orderData.shippingAddress.country}
              </p>
            </div>
            <div className="info-section">
              <h3>Contact Information</h3>
              <p>
                <strong>Email:</strong> {orderData.customer.email}<br />
                <strong>Phone:</strong> {orderData.customer.phone}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="order-items-card">
            <h2>Order Items</h2>
            <div className="items-table">
              <div className="table-header">
                <div className="col-product">Product</div>
                <div className="col-price">Price</div>
                <div className="col-quantity">Quantity</div>
                <div className="col-subtotal">Subtotal</div>
              </div>
              {orderData.items.map((item) => (
                <div key={item.id} className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src={item.image} alt={item.title} />
                      <span>{item.title}</span>
                    </div>
                  </div>
                  <div className="col-price">${item.price.toFixed(2)}</div>
                  <div className="col-quantity">{item.quantity}</div>
                  <div className="col-subtotal">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="table-footer">
                <div className="col-product">Total</div>
                <div className="col-price"></div>
                <div className="col-quantity"></div>
                <div className="col-subtotal">
                  <strong>${orderData.total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="status-timeline-card">
            <h2>Order Status</h2>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Order Placed</h4>
                  <p>{orderData.date} at {orderData.time}</p>
                </div>
              </div>
              <div className="timeline-item pending">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Processing</h4>
                  <p>Expected to start soon</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Shipped</h4>
                  <p>Tracking information will be provided</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Delivered</h4>
                  <p>Estimated delivery in 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="confirmation-actions">
            <Link to="/dashboard" className="view-orders-btn">View All Orders</Link>
            <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        </div>

        {/* Email Notice */}
        <div className="email-notice">
          <p>📧 A confirmation email has been sent to <strong>{orderData.customer.email}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
