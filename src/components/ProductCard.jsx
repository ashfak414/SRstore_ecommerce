import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <div className="product-badge">{product.category}</div>
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-overlay">
          <Link to={`/product/${product.id}`} className="quick-view-btn">
            Quick View
          </Link>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <div className="stars">
            {product.rating && renderStars(product.rating.rate)}
          </div>
          <span className="rating-text">
            {product.rating ? `(${product.rating.count})` : ''}
          </span>
        </div>
        <div className="product-footer">
          <div className="price-section">
            <span className="product-price">${product.price}</span>
            {product.price > 50 && (
              <span className="discount-badge">Save 10%</span>
            )}
          </div>
          <Link to={`/product/${product.id}`} className="view-btn">
            <span>View</span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

