import { useEffect, useState } from "react";
import "./Reviews.css";
import { deleteReview, getReviewById } from "../../services/reviewService";
import { useNavigate } from "react-router-dom";

export const Reviews = ({ reviewId, currentUser, getPlace }) => {
  const [review, setReview] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getReviewById(reviewId).then((reviewObj) => {
      setReview(reviewObj);
    });
  }, [reviewId]);

  const handleDelete = () => {
    deleteReview(reviewId).then(() => {
      getPlace();
    });
  };

  return (
    <div className="review-card">
      <div className="review-group">
        <div
          className="review-name"
          onClick={() => {
            navigate(`/profile/${review.userId}`);
          }}
        >
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
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate(`/review/${review.id}`);
            }}
          >
            Edit
          </button>
          <button className="btn btn-warning" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
