import { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('product_reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Add a new review
  const addReview = (productId, review) => {
    const newReview = {
      id: Date.now(),
      productId,
      userName: review.userName,
      userEmail: review.userEmail,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      createdAt: new Date().toISOString(),
      helpful: 0,
      unhelpful: 0,
    };

    setReviews((prevReviews) => [newReview, ...prevReviews]);
    return newReview;
  };

  // Get reviews for a specific product
  const getProductReviews = (productId) => {
    return reviews.filter((review) => review.productId === productId);
  };

  // Get average rating for a product
  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  // Get rating distribution for a product
  const getRatingDistribution = (productId) => {
    const productReviews = getProductReviews(productId);
    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    productReviews.forEach((review) => {
      distribution[review.rating]++;
    });

    return distribution;
  };

  // Check if user has already reviewed this product
  const hasUserReviewedProduct = (productId, userEmail) => {
    return reviews.some(
      (review) => review.productId === productId && review.userEmail === userEmail
    );
  };

  // Get user's review for a product
  const getUserReviewForProduct = (productId, userEmail) => {
    return reviews.find(
      (review) => review.productId === productId && review.userEmail === userEmail
    );
  };

  // Update existing review
  const updateReview = (reviewId, updates) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? { ...review, ...updates, updatedAt: new Date().toISOString() }
          : review
      )
    );
  };

  // Mark review as helpful
  const markHelpful = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  // Mark review as unhelpful
  const markUnhelpful = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? { ...review, unhelpful: review.unhelpful + 1 }
          : review
      )
    );
  };

  // Delete review
  const deleteReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  const value = {
    reviews,
    addReview,
    getProductReviews,
    getAverageRating,
    getRatingDistribution,
    markHelpful,
    markUnhelpful,
    deleteReview,
    hasUserReviewedProduct,
    getUserReviewForProduct,
    updateReview,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
