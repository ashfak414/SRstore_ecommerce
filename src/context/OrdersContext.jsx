import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString(),
      trackingUpdates: [
        {
          status: 'Order Placed',
          timestamp: new Date().toISOString(),
          message: 'Your order has been placed successfully',
        },
      ],
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, message = '') => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderId === orderId) {
          const updatedTrackingUpdates = [
            ...order.trackingUpdates,
            {
              status: newStatus,
              timestamp: new Date().toISOString(),
              message: message || `Order status updated to ${newStatus}`,
            },
          ];
          return {
            ...order,
            status: newStatus,
            trackingUpdates: updatedTrackingUpdates,
          };
        }
        return order;
      })
    );
  };

  const getOrderById = (orderId) => {
    return orders.find((order) => order.orderId === orderId);
  };

  const getOrdersByUser = (userEmail) => {
    return orders.filter((order) => order.customer.email === userEmail);
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByUser,
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};
