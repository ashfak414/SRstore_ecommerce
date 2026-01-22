import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load initial products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  }, []);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // Normalize orders to have consistent structure
        const normalizedOrders = parsedOrders.map((order) => {
          // If order has orderId (customer order), normalize it
          if (order.orderId && !order.id) {
            return {
              ...order,
              id: order.orderId,
              customerName: `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim(),
              customerEmail: order.customer?.email || '',
            };
          }
          return order;
        });
        setOrders(normalizedOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  }, []);

  // Add Product
  const addProduct = (product) => {
    const newProduct = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...product,
      stock: parseInt(product.stock) || 0,
      price: parseFloat(product.price) || 0,
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  // Update Product
  const updateProduct = (productId, updates) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? {
            ...product,
            ...updates,
            stock: parseInt(updates.stock) || product.stock,
            price: parseFloat(updates.price) || product.price,
            updatedAt: new Date().toISOString(),
          }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  // Delete Product
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
  };

  // Get Product by ID
  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  // Get all products
  const getAllProducts = () => products;

  // Update Order Status
  const updateOrderStatus = (orderId, status, message = '') => {
    const updatedOrders = orders.map((order) => {
      // Match by both id and orderId for compatibility
      const isMatchingOrder = order.id === orderId || order.orderId === orderId;
      if (isMatchingOrder) {
        return {
          ...order,
          status,
          trackingUpdates: [
            ...(order.trackingUpdates || []),
            {
              status,
              message: message || `Order ${status}`,
              timestamp: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Delete Order
  const deleteOrder = (orderId) => {
    // Filter using both id and orderId for compatibility
    const updatedOrders = orders.filter((order) => order.id !== orderId && order.orderId !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Add Order Note
  const addOrderNote = (orderId, note) => {
    const updatedOrders = orders.map((order) => {
      const isMatchingOrder = order.id === orderId || order.orderId === orderId;
      if (isMatchingOrder) {
        return {
          ...order,
          notes: [
            ...(order.notes || []),
            {
              text: note,
              timestamp: new Date().toISOString(),
              author: 'Admin',
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Assign Tracking Number
  const assignTrackingNumber = (orderId, trackingNumber, carrier = '') => {
    const updatedOrders = orders.map((order) => {
      const isMatchingOrder = order.id === orderId || order.orderId === orderId;
      if (isMatchingOrder) {
        return {
          ...order,
          trackingNumber,
          carrier,
          updatedAt: new Date().toISOString(),
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Cancel Order
  const cancelOrder = (orderId, reason = '') => {
    const updatedOrders = orders.map((order) => {
      const isMatchingOrder = order.id === orderId || order.orderId === orderId;
      if (isMatchingOrder) {
        return {
          ...order,
          status: 'cancelled',
          cancelledAt: new Date().toISOString(),
          cancellationReason: reason,
          trackingUpdates: [
            ...(order.trackingUpdates || []),
            {
              status: 'cancelled',
              message: `Order cancelled. Reason: ${reason || 'No reason provided'}`,
              timestamp: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Mark as Refunded
  const markAsRefunded = (orderId, refundAmount, reason = '') => {
    const updatedOrders = orders.map((order) => {
      const isMatchingOrder = order.id === orderId || order.orderId === orderId;
      if (isMatchingOrder) {
        return {
          ...order,
          refunded: true,
          refundAmount: parseFloat(refundAmount),
          refundDate: new Date().toISOString(),
          refundReason: reason,
          trackingUpdates: [
            ...(order.trackingUpdates || []),
            {
              status: 'refunded',
              message: `Order refunded: $${parseFloat(refundAmount).toFixed(2)}`,
              timestamp: new Date().toISOString(),
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Update Order Priority
  const updateOrderPriority = (orderId, priority) => {
    const updatedOrders = orders.map((order) => {
      const isMatchingOrder = order.id === orderId || order.orderId === orderId;
      if (isMatchingOrder) {
        return {
          ...order,
          priority: priority, // 'high', 'normal', 'low'
          updatedAt: new Date().toISOString(),
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Get all orders
  const getAllOrders = () => orders;

  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === orderId || order.orderId === orderId);
  };

  // Get order statistics
  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
      totalRevenue: orders.reduce(
        (sum, order) => sum + (parseFloat(order.total) || 0),
        0
      ),
    };
    return stats;
  };

  // Get product statistics
  const getProductStats = () => {
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock || 0), 0);
    
    return {
      totalProducts: products.length,
      totalStock,
      totalValue,
      lowStockCount: products.filter((p) => p.stock < 10).length,
    };
  };

  const value = {
    products,
    orders,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    updateOrderStatus,
    deleteOrder,
    addOrderNote,
    assignTrackingNumber,
    cancelOrder,
    markAsRefunded,
    updateOrderPriority,
    getAllOrders,
    getOrderById,
    getOrderStats,
    getProductStats,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContext;
