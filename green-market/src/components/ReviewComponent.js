import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./Review.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewComponent = () => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setNewRating] = useState(0);
  const [comment, setNewComment] = useState("");
  const [ratingCounts, setRatingCounts] = useState({});

  useEffect(() => {
    const fetchRatingCounts = async () => {
      try {
        const response = await fetch(`/${productId}/rating-counts`);
        if (!response.ok) {
          throw new Error("Failed to fetch rating counts");
        }
        const ratingCounts = await response.json();
        setRatingCounts(ratingCounts);
      } catch (error) {
        console.error("Error fetching rating counts:", error);
      }
    };

    fetchRatingCounts();
  }, [productId]);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/checksession", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setCurrentUser(data);
      console.log(`Current user: ${data.id}`);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const handleSubmit = async (productId, rating, comment) => {
    try {
      const response = await fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          product_id: productId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      alert("Review successfully posted");
      fetchReviewsForProduct();
      setNewComment('')
      setNewRating(0)
      toast.success('Review successfully posted');
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
      toast.error('Failed to submit review');
    }
  };

  const fetchReviewsForProduct = async () => {
    try {
      const response = await fetch(`/review/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setReviews(data);
      setIsLoading(false);
      console.log(`reviews ${data}`);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews.");
      setIsLoading(false);
    }
  };

  const checkPurchase = async () => {
    try {
      const response = await fetch(`/api/orders/check-purchase/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setHasPurchased(data.hasPurchased);
      console.log(`hasPurchased: ${data.hasPurchased}`);
    } catch (error) {
      console.error("Error checking purchase status:", error);
    }
  };

  const deleteReview = async (review_id) => {
    try {
      const response = await fetch(`/deleteReview/${review_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      alert("Review deleted successfully");
      fetchReviewsForProduct();
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
      toast.error('Failed to delete review');
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    checkPurchase();
    fetchReviewsForProduct(productId); // Fetch reviews for the specific product
  }, [productId]);

  return (
    <div className="container">
      <div className="rating-breakdown">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="rating-stars">
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="15px"
              starSpacing="2px"
              isAggregateRating={true}
            />
            <span>({ratingCounts[rating] || 0})</span>
          </div>
        ))}
      </div>
      <div className="reviews-container">
        <div className="review-form">
          {hasPurchased && (
            <>
              <h2 className="form-heading">Add Your Review</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(productId, rating, comment);
                }}
                className="submit-form"
              >
                <StarRatings
                  rating={Number(rating)}
                  starRatedColor="gold"
                  changeRating={setNewRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                  starSpacing="5px"
                />
                <textarea
                  className="comment-textarea"
                  value={comment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your review"
                  required
                />
                <button type="submit" className="submit-btn">
                  Submit Review
                </button>
              </form>
            </>
          )}
        </div>
        <ul className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review.id} className="review-item">
                <h3 className="review-rating">
                  Rating:
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="3px"
                    isAggregateRating={true}
                  />
                </h3>
                <p className="review-comment">{review.comments}</p>
                {currentUser && review.customer_id === currentUser.id && (
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))
          ) : (
            <p className="no-reviews-text">No reviews available for this product.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReviewComponent;
