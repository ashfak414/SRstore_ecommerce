import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import ProductManagement from '../components/ProductManagement';
import OrderManagement from '../components/OrderManagement';
import OrderStatusManagement from '../components/OrderStatusManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { getOrderStats, getProductStats } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  
  const orderStats = getOrderStats();
  const productStats = getProductStats();

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
          <p>Manage products and orders</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon products">📦</div>
          <div className="stat-content">
            <p className="stat-label">Total Products</p>
            <p className="stat-value">{productStats.totalProducts}</p>
            <p className="stat-detail">Stock: {productStats.totalStock} units</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">📋</div>
          <div className="stat-content">
            <p className="stat-label">Total Orders</p>
            <p className="stat-value">{orderStats.total}</p>
            <p className="stat-detail">Revenue: ${orderStats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-content">
            <p className="stat-label">Pending Orders</p>
            <p className="stat-value">{orderStats.pending}</p>
            <p className="stat-detail">Awaiting processing</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon shipped">🚚</div>
          <div className="stat-content">
            <p className="stat-label">Shipped Orders</p>
            <p className="stat-value">{orderStats.shipped}</p>
            <p className="stat-detail">In transit</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon delivered">✅</div>
          <div className="stat-content">
            <p className="stat-label">Delivered</p>
            <p className="stat-value">{orderStats.delivered}</p>
            <p className="stat-detail">Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon lowStock">⚠️</div>
          <div className="stat-content">
            <p className="stat-label">Low Stock Items</p>
            <p className="stat-value">{productStats.lowStockCount}</p>
            <p className="stat-detail">Less than 10 units</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          Order Status
        </button>
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>📊 Order Status Breakdown</h3>
                <div className="status-breakdown">
                  <div className="breakdown-item">
                    <span className="status-label">Pending</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill pending"
                        style={{ width: `${(orderStats.pending / orderStats.total * 100) || 0}%` }}
                      />
                    </div>
                    <span className="status-count">{orderStats.pending}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="status-label">Processing</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill processing"
                        style={{ width: `${(orderStats.processing / orderStats.total * 100) || 0}%` }}
                      />
                    </div>
                    <span className="status-count">{orderStats.processing}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="status-label">Shipped</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill shipped"
                        style={{ width: `${(orderStats.shipped / orderStats.total * 100) || 0}%` }}
                      />
                    </div>
                    <span className="status-count">{orderStats.shipped}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="status-label">Delivered</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill delivered"
                        style={{ width: `${(orderStats.delivered / orderStats.total * 100) || 0}%` }}
                      />
                    </div>
                    <span className="status-count">{orderStats.delivered}</span>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>💰 Revenue Summary</h3>
                <div className="revenue-info">
                  <div className="revenue-item">
                    <p className="revenue-label">Total Revenue</p>
                    <p className="revenue-amount">${orderStats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="revenue-item">
                    <p className="revenue-label">Average Order Value</p>
                    <p className="revenue-amount">
                      ${(orderStats.total > 0 ? orderStats.totalRevenue / orderStats.total : 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="revenue-item">
                    <p className="revenue-label">Inventory Value</p>
                    <p className="revenue-amount">${productStats.totalValue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'status' && <OrderStatusManagement />}
        {activeTab === 'orders' && <OrderManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
