import { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate, useParams } from "react-router-dom";
import { editReview, getReviewById } from "../../services/reviewService";
import { getDate } from "../../services/dateService";
import { FaStar } from "react-icons/fa";

export const EditReview = () => {
  const [review, setReview] = useState({});
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const { reviewId } = useParams();
  const navigate = useNavigate();

  // const ratingNumbers = [1, 2, 3, 4, 5];

  useEffect(() => {
    getReviewById(reviewId).then((reviewObj) => {
      setReview(reviewObj);
    });
  }, [reviewId]);

  // Highlights the stars to match the rating from the current review
  useEffect(() => {
    setRating(review.rating);
  }, [review]);

  const handleInputChange = (event) => {
    const reviewCopy = { ...review };
    reviewCopy[event.target.name] = event.target.value;
    setReview(reviewCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updateReview = {
      id: review.id,
      rating: parseInt(review.rating),
      body: review.body,
      date: getDate(),
      userId: review.userId,
      locationId: review.locationId,
    };

    editReview(updateReview).then(() => {
      navigate(-1);
    });
  };

  return (
    <form onSubmit={handleSave}>
      <h2 className="page-header">Edit Review</h2>
      <fieldset>
        <div className="radio-group">
          <div>Rating:</div>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => {
                    setRating(currentRating);
                  }}
                  onChange={handleInputChange}
                />
                <FaStar
                  className="star"
                  size={35}
                  color={
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        {/* <div className="radio-group">
          <div>Rating:</div>
          {ratingNumbers.map((number, index) => {
            return (
              <div className="radio" key={index}>
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={number}
                    checked={number === parseInt(review.rating)}
                    onChange={handleInputChange}
                    required
                  />
                  {number}
                </label>
              </div>
            );
          })}
        </div> */}
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Body</label>
          <textarea
            name="body"
            rows="4"
            cols="50"
            value={review.body}
            className="form-body"
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
      </fieldset>
      <div className="form-group">
        <button className="form-btn btn-secondary" type="submit">
          Save Review
        </button>
      </div>
    </form>
  );
};
