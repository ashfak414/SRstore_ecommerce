import { useState } from 'react';
import { useReviews } from '../context/ReviewContext';
import '../styles/ReviewList.css';

const ReviewList = ({ productId }) => {
  const { getProductReviews, getAverageRating, getRatingDistribution, markHelpful, markUnhelpful } = useReviews();
  const [sortBy, setSortBy] = useState('newest');

  const productReviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  const ratingDistribution = getRatingDistribution(productId);

  // Sort reviews
  const sortedReviews = [...productReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (productReviews.length === 0) {
    return (
      <div className="reviews-container">
        <div className="no-reviews">
          <p>No reviews yet</p>
          <small>Be the first to review this product!</small>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="rating-display">
          <div className="average-rating">
            <span className="rating-number">{averageRating}</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= Math.round(averageRating) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <small>{productReviews.length} review{productReviews.length !== 1 ? 's' : ''}</small>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="rating-distribution">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating];
            const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;

            return (
              <div key={rating} className="distribution-row">
                <span className="rating-label">{rating} ★</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sort Options */}
      <div className="sort-container">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {sortedReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <div className="reviewer-details">
                  <p className="reviewer-name">{review.userName}</p>
                  <small className="review-date">{formatDate(review.createdAt)}</small>
                </div>
              </div>
              <div className="review-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= review.rating ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="review-content">
              <h4 className="review-title">{review.title}</h4>
              <p className="review-comment">{review.comment}</p>
            </div>

            <div className="review-footer">
              <div className="helpful-section">
                <button
                  className="helpful-btn"
                  onClick={() => markHelpful(review.id)}
                  title="Mark as helpful"
                >
                  👍 Helpful ({review.helpful})
                </button>
                <button
                  className="unhelpful-btn"
                  onClick={() => markUnhelpful(review.id)}
                  title="Mark as unhelpful"
                >
                  👎 ({review.unhelpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
