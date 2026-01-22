import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../styles/OrderManagement.css';

const OrderManagement = () => {
  const { 
    orders, 
    updateOrderStatus, 
    deleteOrder,
    addOrderNote,
    assignTrackingNumber,
    cancelOrder,
    markAsRefunded,
    updateOrderPriority,
  } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [orderNote, setOrderNote] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [orderPriority, setOrderPriority] = useState('normal');

  const statusColors = {
    pending: '#FFA500',
    processing: '#3B82F6',
    shipped: '#8B5CF6',
    delivered: '#10B981',
    cancelled: '#EF4444',
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId, status) => {
    if (status && status !== '') {
      updateOrderStatus(orderId, status, `Order status updated to ${status}`);
      setNewStatus('');
      setSelectedOrder(null);
      alert('Order status updated successfully!');
    }
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId);
    setDeleteConfirmId(null);
    setSelectedOrder(null);
    alert('Order deleted successfully!');
  };

  const handleAddNote = (orderId) => {
    if (orderNote.trim()) {
      addOrderNote(orderId, orderNote);
      setOrderNote('');
      setSelectedOrder(null);
      alert('Note added successfully!');
    }
  };

  const handleAssignTracking = (orderId) => {
    if (trackingNumber.trim()) {
      assignTrackingNumber(orderId, trackingNumber, carrier);
      setTrackingNumber('');
      setCarrier('');
      setSelectedOrder(null);
      alert('Tracking number assigned!');
    } else {
      alert('Please enter a tracking number');
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Cancel this order? Reason: ${cancellationReason || 'Not specified'}`)) {
      cancelOrder(orderId, cancellationReason);
      setCancellationReason('');
      setSelectedOrder(null);
      alert('Order cancelled successfully!');
    }
  };

  const handleMarkRefunded = (orderId) => {
    if (refundAmount.trim()) {
      markAsRefunded(orderId, refundAmount, cancellationReason);
      setRefundAmount('');
      setCancellationReason('');
      setSelectedOrder(null);
      alert('Order marked as refunded!');
    } else {
      alert('Please enter a refund amount');
    }
  };

  const handlePriorityChange = (orderId, priority) => {
    updateOrderPriority(orderId, priority);
    setOrderPriority('normal');
    alert('Priority updated!');
  };

  const stats = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  return (
    <div className="order-management">
      {/* Header */}
      <div className="om-header">
        <div className="om-title">
          <h2>Order Management</h2>
          <p>{filteredOrders.length} orders</p>
        </div>
      </div>

      {/* Stats Filters */}
      <div className="status-filter-bar">
        <button
          className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          All ({orders.length})
        </button>
        <button
          className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
          onClick={() => setStatusFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={`filter-btn ${statusFilter === 'processing' ? 'active' : ''}`}
          onClick={() => setStatusFilter('processing')}
        >
          Processing ({stats.processing})
        </button>
        <button
          className={`filter-btn ${statusFilter === 'shipped' ? 'active' : ''}`}
          onClick={() => setStatusFilter('shipped')}
        >
          Shipped ({stats.shipped})
        </button>
        <button
          className={`filter-btn ${statusFilter === 'delivered' ? 'active' : ''}`}
          onClick={() => setStatusFilter('delivered')}
        >
          Delivered ({stats.delivered})
        </button>
        <button
          className={`filter-btn ${statusFilter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setStatusFilter('cancelled')}
        >
          Cancelled ({stats.cancelled})
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by order ID, customer email, or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Orders List */}
      <div className="orders-container">
        {filteredOrders.length > 0 ? (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <h3>{order.id}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className="status-badge"
                    style={{ backgroundColor: statusColors[order.status] }}
                  >
                    {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="customer-info">
                    <p>
                      <strong>Customer:</strong> {order.customerName}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.customerEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.customerPhone}
                    </p>
                  </div>

                  <div className="order-summary">
                    <p>
                      <strong>Items:</strong> {order.items.length} product(s)
                    </p>
                    <p>
                      <strong>Total:</strong>{' '}
                      <span className="total-amount">
                        ${parseFloat(order.total).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  <div className="shipping-info">
                    <strong>Shipping Address:</strong>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>

                <div className="order-card-footer">
                  <button
                    className="btn-view-details"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details →
                  </button>
                  <button
                    className="btn-delete-order"
                    onClick={() => setDeleteConfirmId(order.id)}
                    title="Delete order"
                  >
                    🗑️
                  </button>
                  
                  {/* Delete Confirmation */}
                  {deleteConfirmId === order.id && (
                    <div className="delete-confirm-order">
                      <p>Delete this order?</p>
                      <div className="confirm-actions">
                        <button
                          className="btn-confirm-yes"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          Yes
                        </button>
                        <button
                          className="btn-confirm-no"
                          onClick={() => setDeleteConfirmId(null)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>📋 No orders found</p>
            <p>Orders will appear here once customers place them</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {/* Status Update Section */}
              <div className="status-update-section">
                <h4>Update Order Status</h4>
                <div className="status-update-form">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="status-select"
                  >
                    <option value="">Select new status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    className="btn-update-status"
                    onClick={() => handleStatusChange(selectedOrder.id, newStatus)}
                    disabled={!newStatus}
                  >
                    Update Status
                  </button>
                </div>
              </div>

              {/* Order Information */}
              <div className="detail-section">
                <h4>Customer Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Name:</span>
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Email:</span>
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Phone:</span>
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="detail-section">
                <h4>Shipping Address</h4>
                <div className="address-block">
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>
                    {selectedOrder.shippingAddress.city},{' '}
                    {selectedOrder.shippingAddress.state}{' '}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="detail-section">
                <h4>Order Items</h4>
                <div className="items-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.title}</td>
                            <td>${parseFloat(item.price || 0).toFixed(2)}</td>
                            <td>{item.quantity || 1}</td>
                            <td>
                              ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#94a3b8' }}>
                            No items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="detail-section">
                <h4>Order Summary</h4>
                <div className="summary-block">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${parseFloat(selectedOrder.total).toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${parseFloat(selectedOrder.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Tracking History */}
              <div className="detail-section">
                <h4>Tracking History</h4>
                <div className="tracking-timeline">
                  {selectedOrder.trackingUpdates && selectedOrder.trackingUpdates.length > 0 ? (
                    selectedOrder.trackingUpdates.map((update, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker" />
                        <div className="timeline-content">
                          <p className="timeline-status">{update.status || 'Unknown'}</p>
                          <p className="timeline-message">{update.message || 'No message'}</p>
                          <p className="timeline-time">
                            {update.timestamp ? new Date(update.timestamp).toLocaleString() : 'No timestamp'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#94a3b8' }}>No tracking history available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Order Management Controls */}
            <div className="advanced-controls-section">
              <h3>Order Management</h3>
              
              {/* Priority Control */}
              <div className="control-group">
                <label>Order Priority:</label>
                <div className="priority-buttons">
                  <button 
                    className={`priority-btn priority-high ${selectedOrder.priority === 'high' ? 'active' : ''}`}
                    onClick={() => handlePriorityChange(selectedOrder.id, 'high')}
                  >
                    🔴 High
                  </button>
                  <button 
                    className={`priority-btn priority-normal ${selectedOrder.priority === 'normal' ? 'active' : ''}`}
                    onClick={() => handlePriorityChange(selectedOrder.id, 'normal')}
                  >
                    🟡 Normal
                  </button>
                  <button 
                    className={`priority-btn priority-low ${selectedOrder.priority === 'low' ? 'active' : ''}`}
                    onClick={() => handlePriorityChange(selectedOrder.id, 'low')}
                  >
                    🟢 Low
                  </button>
                </div>
              </div>

              {/* Tracking Number */}
              <div className="control-group">
                <label>Tracking Information:</label>
                <div className="tracking-inputs">
                  <input
                    type="text"
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="input-field"
                  />
                  <select 
                    value={carrier} 
                    onChange={(e) => setCarrier(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select Carrier</option>
                    <option value="FedEx">FedEx</option>
                    <option value="UPS">UPS</option>
                    <option value="DHL">DHL</option>
                    <option value="USPS">USPS</option>
                    <option value="Other">Other</option>
                  </select>
                  <button 
                    className="btn-assign-tracking"
                    onClick={() => handleAssignTracking(selectedOrder.id)}
                  >
                    Assign Tracking
                  </button>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="tracking-display">
                    <p><strong>Current Tracking:</strong> {selectedOrder.trackingNumber} ({selectedOrder.carrier || 'N/A'})</p>
                  </div>
                )}
              </div>

              {/* Add Note */}
              <div className="control-group">
                <label>Internal Notes:</label>
                <div className="note-inputs">
                  <textarea
                    placeholder="Add an internal note..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="note-field"
                    rows="2"
                  />
                  <button 
                    className="btn-add-note"
                    onClick={() => handleAddNote(selectedOrder.id)}
                  >
                    Add Note
                  </button>
                </div>
                {selectedOrder.notes && selectedOrder.notes.length > 0 && (
                  <div className="notes-display">
                    <p><strong>Notes History:</strong></p>
                    {selectedOrder.notes.map((note, idx) => (
                      <div key={idx} className="note-item">
                        <p>{note.text}</p>
                        <small>{new Date(note.timestamp).toLocaleString()}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Refund Management */}
              <div className="control-group">
                <label>Refund Management:</label>
                <div className="refund-inputs">
                  <input
                    type="number"
                    placeholder="Refund Amount"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    className="input-field"
                    step="0.01"
                    min="0"
                  />
                  <input
                    type="text"
                    placeholder="Refund Reason"
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    className="input-field"
                  />
                  <button 
                    className="btn-refund"
                    onClick={() => handleMarkRefunded(selectedOrder.id)}
                  >
                    Mark Refunded
                  </button>
                </div>
                {selectedOrder.refunded && (
                  <div className="refund-display">
                    <p><strong>Refunded:</strong> ${selectedOrder.refundAmount?.toFixed(2)} - {selectedOrder.refundReason}</p>
                  </div>
                )}
              </div>

              {/* Cancel Order */}
              <div className="control-group">
                <label>Cancel Order:</label>
                <div className="cancel-inputs">
                  <input
                    type="text"
                    placeholder="Cancellation Reason"
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    className="input-field"
                  />
                  <button 
                    className="btn-cancel-order"
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    disabled={selectedOrder.status === 'cancelled'}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-delete-order-modal"
                onClick={() => setDeleteConfirmId(selectedOrder.id)}
              >
                Delete Order
              </button>
              <button
                className="btn-close"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirmId === selectedOrder.id && (
              <div className="delete-confirm-modal">
                <p>Are you sure you want to delete this order?</p>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>This action cannot be undone.</p>
                <div className="confirm-actions" style={{ marginTop: '1.5rem' }}>
                  <button
                    className="btn-confirm-yes"
                    onClick={() => handleDeleteOrder(selectedOrder.id)}
                  >
                    Delete Order
                  </button>
                  <button
                    className="btn-confirm-no"
                    onClick={() => setDeleteConfirmId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
