import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext';
import { AdminProvider } from './context/AdminContext';
import { ReviewProvider } from './context/ReviewContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProductDetails from './pages/ProductDetails';
import OrderDetails from './pages/OrderDetails';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <AdminProvider>
          <ReviewProvider>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route 
                    path="/checkout" 
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    } 
                  />
                  <Route
                    path="/order-confirmation"
                    element={
                      <PrivateRoute>
                        <OrderConfirmation />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <OrderHistory />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route
                    path="/order/:id"
                    element={
                      <PrivateRoute>
                        <OrderDetails />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ReviewProvider>
        </AdminProvider>
      </OrdersProvider>
    </CartProvider>
  );
}

export default App;

