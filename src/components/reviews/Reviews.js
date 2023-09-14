import { useEffect, useState } from "react";
import "./Reviews.css";
import { getReviewById } from "../../services/reviewService";

export const Reviews = ({ reviewId, currentUser }) => {
  const [review, setReview] = useState({});

  useEffect(() => {
    getReviewById(reviewId).then((reviewObj) => {
      setReview(reviewObj);
    });
  }, [reviewId]);

  return (
    <div className="review-card">
      <div className="review-group">
        <div>
          <span className="review-info">Name: </span>
          {review.user?.fullName}
        </div>
        <div>
          <span className="review-info">Date: </span>
          {review.date}
        </div>
      </div>
      <div>
        <span className="review-info">Rating: </span>
        {review.rating} Stars
      </div>
      <div>
        <span className="review-info">Review: </span>
        {review.body}
      </div>
      {currentUser.id === review.userId ? (
        <div className="btn-container-two">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-warning">Delete</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
