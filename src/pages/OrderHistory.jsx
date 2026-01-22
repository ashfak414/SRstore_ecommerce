import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const { getOrdersByUser } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const userOrders = getOrdersByUser(currentUser?.email || '');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#fbbf24';
      case 'Processing':
        return '#3b82f6';
      case 'Shipped':
        return '#8b5cf6';
      case 'Delivered':
        return '#10b981';
      case 'Cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="order-history-container">
      <div className="order-history-wrapper">
        <h1>Order History</h1>

        {userOrders.length === 0 ? (
          <div className="no-orders-message">
            <div className="no-orders-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping now!</p>
            <Link to="/" className="start-shopping-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-layout">
            {/* Orders List */}
            <div className="orders-list-section">
              <h2>Your Orders</h2>
              <div className="orders-list">
                {userOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className={`order-card ${selectedOrder?.orderId === order.orderId ? 'active' : ''}`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="order-card-header">
                      <div className="order-id-badge">{order.orderId}</div>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="order-card-content">
                      <div className="card-row">
                        <span className="card-label">Date:</span>
                        <span className="card-value">{order.date}</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Items:</span>
                        <span className="card-value">{order.items.length} item(s)</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Total:</span>
                        <span className="card-value total">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            {selectedOrder && (
              <div className="order-details-section">
                <div className="details-header">
                  <h2>Order Details</h2>
                  <button
                    className="close-details"
                    onClick={() => setSelectedOrder(null)}
                  >
                    ✕
                  </button>
                </div>

                {/* Order Info */}
                <div className="details-card">
                  <h3>Order Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Order ID:</label>
                      <p className="order-id">{selectedOrder.orderId}</p>
                    </div>
                    <div className="info-item">
                      <label>Status:</label>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="info-item">
                      <label>Order Date:</label>
                      <p>{selectedOrder.date}</p>
                    </div>
                    <div className="info-item">
                      <label>Total:</label>
                      <p className="total-amount">${selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="details-card">
                  <h3>Shipping Address</h3>
                  <p>
                    {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}<br />
                    {selectedOrder.shippingAddress.address}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.zipCode}<br />
                    {selectedOrder.shippingAddress.country}
                  </p>
                </div>

                {/* Ordered Items */}
                <div className="details-card">
                  <h3>Items in Order</h3>
                  <div className="items-summary">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="item-row">
                        <img src={item.image} alt={item.title} />
                        <div className="item-details">
                          <p className="item-title">{item.title}</p>
                          <p className="item-price">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <p className="item-subtotal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="details-card">
                  <h3>Tracking Updates</h3>
                  <div className="tracking-timeline">
                    {selectedOrder.trackingUpdates.map((update, index) => (
                      <div key={index} className="tracking-item">
                        <div className="tracking-dot"></div>
                        <div className="tracking-content">
                          <h4>{update.status}</h4>
                          <p className="tracking-time">
                            {formatDate(update.timestamp)}
                          </p>
                          <p className="tracking-message">{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="details-card">
                  <h3>Contact Information</h3>
                  <div className="contact-info">
                    <p>
                      <strong>Email:</strong> {selectedOrder.customer.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.customer.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
