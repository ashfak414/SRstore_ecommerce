import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import '../styles/ReviewForm.css';

const ReviewForm = ({ productId, productTitle }) => {
  const { currentUser } = useAuth();
  const { addReview } = useReviews();
  
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const userName = currentUser?.email?.split('@')[0] || 'Anonymous';
      
      addReview(productId, {
        userName,
        userEmail: currentUser?.email || '',
        rating: parseInt(rating),
        title: title.trim(),
        comment: comment.trim(),
      });

      // Show success message
      setSubmitted(true);
      
      // Reset form
      setTitle('');
      setComment('');
      setRating(5);

      // Close dialog after 2 seconds
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      alert('Error submitting review. Please try again.');
      console.error('Review error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="review-login-prompt">
        <p>Please log in to submit a review</p>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      {!isOpen ? (
        <button className="btn-write-review" onClick={() => setIsOpen(true)}>
          ✏️ Write a Review
        </button>
      ) : (
        <div className="review-form-modal">
          <div className="review-form-header">
            <h3>Write a Review</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="submission-success">
              <div className="success-icon">✓</div>
              <p>Thank you for your review!</p>
              <small>Your review has been submitted successfully.</small>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label>Product</label>
                <p className="product-name">{productTitle}</p>
              </div>

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={currentUser?.email?.split('@')[0] || ''}
                  disabled
                  className="input-disabled"
                />
              </div>

              <div className="form-group">
                <label>Rating *</label>
                <div className="rating-selector">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${rating >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      title={`${star} star${star !== 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-label">
                    {rating === 5 && 'Excellent'}
                    {rating === 4 && 'Good'}
                    {rating === 3 && 'Average'}
                    {rating === 2 && 'Poor'}
                    {rating === 1 && 'Terrible'}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Review Title *</label>
                <input
                  type="text"
                  placeholder="Summarize your experience"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength="100"
                  className="input-field"
                />
                <small>{title.length}/100</small>
              </div>

              <div className="form-group">
                <label>Your Review *</label>
                <textarea
                  placeholder="Share your experience with this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength="1000"
                  rows="5"
                  className="textarea-field"
                />
                <small>{comment.length}/1000</small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit-review"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
