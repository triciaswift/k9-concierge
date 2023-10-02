import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import { useState } from "react";
import { postReview } from "../../services/reviewService";
import { getDate } from "../../services/dateService";
import { FaStar } from "react-icons/fa";

export const NewReview = ({ currentUser }) => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    body: "",
    date: "",
    userId: 0,
    placeId: 0,
  });
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const { placeId } = useParams();
  const navigate = useNavigate();

  // const ratingNumbers = [1, 2, 3, 4, 5];

  const handleInputChange = (event) => {
    const reviewCopy = { ...newReview };
    reviewCopy[event.target.name] = event.target.value;
    setNewReview(reviewCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newPlaceReview = {
      rating: parseInt(newReview.rating),
      body: newReview.body,
      date: getDate(),
      userId: currentUser.id,
      placeId: parseInt(placeId),
    };

    if (rating) {
      postReview(newPlaceReview).then(() => {
        navigate(-1);
      });
    } else {
      setShowErrorMsg(true);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <h2 className="page-header">Add Review</h2>
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

        {showErrorMsg ? (
          <div
            className="error-message"
            style={{ display: rating ? "none" : "block" }}
          >
            Please select a rating.
          </div>
        ) : (
          ""
        )}

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
          <label>Body:</label>
          <textarea
            name="body"
            rows="4"
            cols="50"
            value={newReview.body}
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
