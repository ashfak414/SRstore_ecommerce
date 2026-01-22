import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../styles/OrderStatusManagement.css';

const OrderStatusManagement = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const statusWorkflow = [
    { value: 'pending', label: 'Pending', color: '#FFA500', icon: '⏳' },
    { value: 'processing', label: 'Processing', color: '#3B82F6', icon: '⚙️' },
    { value: 'ready_to_ship', label: 'Ready to Ship', color: '#8B5CF6', icon: '📦' },
    { value: 'shipped', label: 'Shipped', color: '#06B6D4', icon: '🚚' },
    { value: 'delivered', label: 'Delivered', color: '#10B981', icon: '✓' },
    { value: 'cancelled', label: 'Cancelled', color: '#EF4444', icon: '✕' },
  ];

  const statusOrder = ['pending', 'processing', 'ready_to_ship', 'shipped', 'delivered', 'cancelled'];

  // Filter for pending orders by default
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const pendingOrders = filteredOrders.filter((o) => o.status === 'pending');
  const processingOrders = filteredOrders.filter((o) => o.status === 'processing');
  const readyToShipOrders = filteredOrders.filter((o) => o.status === 'ready_to_ship');
  const shippedOrders = filteredOrders.filter((o) => o.status === 'shipped');
  const deliveredOrders = filteredOrders.filter((o) => o.status === 'delivered');
  const cancelledOrders = filteredOrders.filter((o) => o.status === 'cancelled');

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus, `Order status changed to ${newStatus}`);
    alert(`Order status updated to ${newStatus}!`);
  };

  const getStatusInfo = (status) => {
    return statusWorkflow.find((s) => s.value === status) || statusWorkflow[0];
  };

  const OrderCard = ({ order, isExpanded, onToggle }) => {
    const currentStatus = getStatusInfo(order.status);
    const currentStatusIndex = statusOrder.indexOf(order.status || 'pending');

    return (
      <div className={`order-status-card ${isExpanded ? 'expanded' : ''}`}>
        <div className="order-header" onClick={onToggle}>
          <div className="order-header-left">
            <span className="order-id">{order.id}</span>
            <span className="customer-name">{order.customerName}</span>
          </div>
          <div className="order-header-right">
            <span className="status-badge" style={{ backgroundColor: currentStatus.color }}>
              {currentStatus.icon} {currentStatus.label}
            </span>
            <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="order-expanded-content">
            <div className="order-details-row">
              <div className="detail-item">
                <label>Order ID:</label>
                <p>{order.id}</p>
              </div>
              <div className="detail-item">
                <label>Customer:</label>
                <p>{order.customerName}</p>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <p>{order.customerEmail}</p>
              </div>
              <div className="detail-item">
                <label>Total:</label>
                <p className="price">${order.total?.toFixed(2)}</p>
              </div>
            </div>

            <div className="status-workflow-container">
              <h4>Change Status:</h4>
              <div className="status-workflow">
                {statusWorkflow.map((status) => {
                  const isCurrentStatus = order.status === status.value;
                  const canTransition =
                    order.status === 'cancelled' ||
                    status.value === 'cancelled' ||
                    statusOrder.indexOf(status.value) >= currentStatusIndex;

                  return (
                    <button
                      key={status.value}
                      className={`status-option ${isCurrentStatus ? 'current' : ''} ${!canTransition ? 'disabled' : ''}`}
                      style={{
                        backgroundColor: isCurrentStatus ? status.color : 'transparent',
                        borderColor: status.color,
                      }}
                      onClick={() => {
                        if (canTransition && !isCurrentStatus) {
                          handleStatusChange(order.id, status.value);
                        }
                      }}
                      disabled={!canTransition}
                      title={!canTransition ? 'Cannot go back to previous status' : ''}
                    >
                      <span className="status-icon">{status.icon}</span>
                      <span className="status-name">{status.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="order-info-section">
              <div className="info-grid">
                <div className="info-item">
                  <label>Order Date:</label>
                  <p>{order.date}</p>
                </div>
                <div className="info-item">
                  <label>Items Count:</label>
                  <p>{order.items?.length || 0} items</p>
                </div>
                <div className="info-item">
                  <label>Priority:</label>
                  <p className={`priority-badge priority-${order.priority || 'normal'}`}>
                    {order.priority === 'high' && '🔴'}
                    {order.priority === 'normal' && '🟡'}
                    {order.priority === 'low' && '🟢'}
                    {order.priority || 'normal'}
                  </p>
                </div>
                <div className="info-item">
                  <label>Tracking:</label>
                  <p>{order.trackingNumber || 'Not assigned'}</p>
                </div>
              </div>
            </div>

            {order.items && order.items.length > 0 && (
              <div className="items-section">
                <h4>Items in Order:</h4>
                <div className="items-list">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="item-row">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="item-image" />
                      )}
                      <div className="item-details">
                        <p className="item-title">{item.title}</p>
                        <p className="item-info">
                          ${item.price?.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="item-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {order.notes && order.notes.length > 0 && (
              <div className="notes-section">
                <h4>Notes:</h4>
                <div className="notes-list">
                  {order.notes.slice(-3).map((note, idx) => (
                    <div key={idx} className="note-item">
                      <p>{note.text}</p>
                      <small>{new Date(note.timestamp).toLocaleString()}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const OrderSection = ({ title, orders: sectionOrders, color }) => {
    return (
      <div className="order-section">
        <div className="section-header" style={{ borderLeftColor: color }}>
          <h3>{title}</h3>
          <span className="order-count">{sectionOrders.length}</span>
        </div>
        <div className="orders-list">
          {sectionOrders.length > 0 ? (
            sectionOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrderId === order.id}
                onToggle={() =>
                  setExpandedOrderId(expandedOrderId === order.id ? null : order.id)
                }
              />
            ))
          ) : (
            <div className="empty-state">
              <p>No orders in this status</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="order-status-management">
      <div className="management-header">
        <h2>Order Status Management</h2>
        <p>Manage order lifecycle and track fulfillment progress</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Order ID, Email, or Customer Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="status-overview">
        <div className="overview-item pending">
          <div className="overview-number">{pendingOrders.length}</div>
          <div className="overview-label">Pending</div>
        </div>
        <div className="overview-item processing">
          <div className="overview-number">{processingOrders.length}</div>
          <div className="overview-label">Processing</div>
        </div>
        <div className="overview-item ready">
          <div className="overview-number">{readyToShipOrders.length}</div>
          <div className="overview-label">Ready to Ship</div>
        </div>
        <div className="overview-item shipped">
          <div className="overview-number">{shippedOrders.length}</div>
          <div className="overview-label">Shipped</div>
        </div>
        <div className="overview-item delivered">
          <div className="overview-number">{deliveredOrders.length}</div>
          <div className="overview-label">Delivered</div>
        </div>
        <div className="overview-item cancelled">
          <div className="overview-number">{cancelledOrders.length}</div>
          <div className="overview-label">Cancelled</div>
        </div>
      </div>

      <div className="orders-sections">
        <OrderSection title="⏳ Pending Orders" orders={pendingOrders} color="#FFA500" />
        <OrderSection title="⚙️ Processing Orders" orders={processingOrders} color="#3B82F6" />
        <OrderSection
          title="📦 Ready to Ship"
          orders={readyToShipOrders}
          color="#8B5CF6"
        />
        <OrderSection title="🚚 Shipped Orders" orders={shippedOrders} color="#06B6D4" />
        <OrderSection
          title="✓ Delivered Orders"
          orders={deliveredOrders}
          color="#10B981"
        />
        <OrderSection
          title="✕ Cancelled Orders"
          orders={cancelledOrders}
          color="#EF4444"
        />
      </div>
    </div>
  );
};

export default OrderStatusManagement;
