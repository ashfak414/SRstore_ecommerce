import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products: adminProducts } = useAdmin();

  const slides = [
    {
      id: 1,
      title: "Welcome to SR Online-Shop",
      subtitle: "Discover amazing products at great prices",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
      bgColor: "linear-gradient(135deg, #00d4aa 0%, #00a8cc 100%)"
    },
    {
      id: 2,
      title: "Best Deals & Offers",
      subtitle: "Shop the latest trends and save more",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
      bgColor: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)"
    },
    {
      id: 3,
      title: "Free Shipping Available",
      subtitle: "On orders over $50",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
      bgColor: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
    }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&h=600&fit=crop"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&h=600&fit=crop"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1555539594-58d7cb561611?w=1200&h=600&fit=crop"
            className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid">
          {/* Admin products first */}
          {adminProducts && adminProducts.length > 0 && 
            adminProducts.map((product) => (
              <ProductCard key={`admin-${product.id}`} product={product} />
            ))
          }
          {/* API products */}
          {products.map((product) => (
            <ProductCard key={`api-${product.id}`} product={product} />
          ))}
        </div>
        {adminProducts.length === 0 && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
            <p>No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

