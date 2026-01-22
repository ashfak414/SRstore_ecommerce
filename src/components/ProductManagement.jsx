import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../styles/ProductManagement.css';

const ProductManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
    stock: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      description: '',
      image: '',
      stock: '',
    });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      updateProduct(editingId, formData);
      alert('Product updated successfully!');
    } else {
      addProduct(formData);
      alert('Product added successfully!');
    }

    resetForm();
    setIsFormOpen(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    setShowDeleteConfirm(null);
    alert('Product deleted successfully!');
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-management">
      {/* Header */}
      <div className="pm-header">
        <div className="pm-title">
          <h2>Product Management</h2>
          <p>{filteredProducts.length} products</p>
        </div>
        <button
          className="btn-add-product"
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
        >
          ➕ Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by product name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
              <button
                className="modal-close"
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports & Outdoors</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="products-table-container">
        {filteredProducts.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className={product.stock < 10 ? 'low-stock' : ''}>
                  <td className="image-cell">
                    <img src={product.image} alt={product.title} />
                  </td>
                  <td className="title-cell">
                    <div>
                      <p className="product-title">{product.title}</p>
                      {product.stock < 10 && (
                        <span className="low-stock-badge">⚠️ Low Stock</span>
                      )}
                    </div>
                  </td>
                  <td>{product.category || '-'}</td>
                  <td className="price-cell">${parseFloat(product.price).toFixed(2)}</td>
                  <td className="stock-cell">
                    <span className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(product)}
                      title="Edit product"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => setShowDeleteConfirm(product.id)}
                      title="Delete product"
                    >
                      🗑️
                    </button>

                    {/* Delete Confirmation */}
                    {showDeleteConfirm === product.id && (
                      <div className="delete-confirm">
                        <p>Are you sure?</p>
                        <div className="confirm-actions">
                          <button
                            className="btn-confirm-yes"
                            onClick={() => handleDelete(product.id)}
                          >
                            Yes
                          </button>
                          <button
                            className="btn-confirm-no"
                            onClick={() => setShowDeleteConfirm(null)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>📦 No products found</p>
            <p>Add your first product to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
