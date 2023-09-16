import { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate, useParams } from "react-router-dom";
import { editReview, getReviewById } from "../../services/reviewService";

export const EditReview = () => {
  const [review, setReview] = useState({});
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const ratingNumbers = [1, 2, 3, 4, 5];

  useEffect(() => {
    getReviewById(reviewId).then((reviewObj) => {
      setReview(reviewObj);
    });
  }, [reviewId]);

  const handleInputChange = (event) => {
    const reviewCopy = { ...review };
    reviewCopy[event.target.name] = event.target.value;
    setReview(reviewCopy);
  };

  const handleDate = () => {
    const currentDate = new Date();

    // Extract year, month, and day components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updateReview = {
      id: review.id,
      rating: parseInt(review.rating),
      body: review.body,
      date: handleDate(),
      userId: review.userId,
      placeId: review.placeId,
    };

    editReview(updateReview).then(() => {
      navigate(`/place/${review.placeId}`);
    });
  };

  return (
    <form>
      <h2 className="page-header">Edit Review</h2>
      <fieldset>
        <div className="radio-group">
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
                  />
                  {number}
                </label>
              </div>
            );
          })}
        </div>
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
          ></textarea>
        </div>
      </fieldset>
      <div className="form-group">
        <button className="form-btn btn-secondary" onClick={handleSave}>
          Save Review
        </button>
      </div>
    </form>
  );
};
