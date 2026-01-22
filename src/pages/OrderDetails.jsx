import { useParams, Link } from 'react-router-dom';
import './OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();

  // Mock order data - in a real app, this would be fetched from an API
  const orderData = {
    1: {
      id: 1,
      productName: 'Fjallraven - Foldsack No. 1 Backpack',
      date: '2024-01-15',
      status: 'Delivered',
      total: 29.99,
      quantity: 1,
      address: '123 Main St, City, State 12345',
      trackingNumber: 'TRK123456789',
    },
    2: {
      id: 2,
      productName: 'Mens Casual Premium Slim Fit T-Shirts',
      date: '2024-01-20',
      status: 'Processing',
      total: 49.99,
      quantity: 2,
      address: '456 Oak Ave, City, State 67890',
      trackingNumber: 'TRK987654321',
    },
    3: {
      id: 3,
      productName: 'Mens Cotton Jacket',
      date: '2024-01-25',
      status: 'Shipped',
      total: 19.99,
      quantity: 1,
      address: '789 Pine Rd, City, State 11223',
      trackingNumber: 'TRK456789123',
    },
  };

  const order = orderData[id] || {
    id: id,
    productName: 'Product',
    date: 'N/A',
    status: 'Unknown',
    total: 0,
    quantity: 0,
    address: 'N/A',
    trackingNumber: 'N/A',
  };

  return (
    <div className="order-details">
      <div className="container">
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
        <div className="order-details-card">
          <h1>Order Details</h1>
          <div className="order-info-grid">
            <div className="order-section">
              <h2>Order Information</h2>
              <div className="info-item">
                <strong>Order ID:</strong> #{order.id}
              </div>
              <div className="info-item">
                <strong>Date:</strong> {order.date}
              </div>
              <div className="info-item">
                <strong>Status:</strong>{' '}
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="info-item">
                <strong>Total:</strong> <span className="total-amount">${order.total}</span>
              </div>
            </div>

            <div className="order-section">
              <h2>Product Details</h2>
              <div className="info-item">
                <strong>Product:</strong> {order.productName}
              </div>
              <div className="info-item">
                <strong>Quantity:</strong> {order.quantity}
              </div>
              <div className="info-item">
                <strong>Unit Price:</strong> ${(order.total / order.quantity).toFixed(2)}
              </div>
            </div>

            <div className="order-section">
              <h2>Shipping Information</h2>
              <div className="info-item">
                <strong>Shipping Address:</strong>
                <p className="address">{order.address}</p>
              </div>
              <div className="info-item">
                <strong>Tracking Number:</strong> {order.trackingNumber}
              </div>
            </div>
          </div>
          <div className="order-actions">
            <Link to="/dashboard" className="btn-secondary">
              View All Orders
            </Link>
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;



