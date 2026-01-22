import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const { getProductById } = useAdmin();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // First check admin products
        const adminProduct = getProductById(parseInt(id));
        if (adminProduct) {
          setProduct(adminProduct);
          setError(null);
          return;
        }
        // Then fetch from API
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById]);

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    alert(`${quantity} x ${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error">Error: {error || 'Product not found'}</div>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="container">
        <Link to="/" className="back-link">← Back to Home</Link>
        <div className="product-details-content">
          <div className="product-image-large">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details-info">
            <h1>{product.title}</h1>
            <p className="product-category-badge">{product.category}</p>
            <div className="product-rating">
              <span>⭐ {product.rating?.rate || 'N/A'}</span>
              <span>({product.rating?.count || 0} reviews)</span>
            </div>
            <div className="product-price-large">${product.price}</div>
            <p className="product-description">{product.description}</p>
            <div className="quantity-selector" style={{ marginBottom: '20px' }}>
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{
                  width: '60px',
                  padding: '8px',
                  marginLeft: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
            <div className="product-actions">
              <button onClick={handleAddToCart} className="order-btn">
                {currentUser ? 'Add to Cart' : 'Login to Add to Cart'}
              </button>
              {currentUser && (
                <Link to="/dashboard" className="dashboard-link">
                  View Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-wrapper">
            <ReviewForm productId={id} productTitle={product?.title} />
            <ReviewList productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

