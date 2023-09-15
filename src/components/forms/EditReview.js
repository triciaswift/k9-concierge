import { useEffect, useState } from "react";
import "./Form.css";
import { useParams } from "react-router-dom";
import { getReviewById } from "../../services/reviewService";

export const EditReview = () => {
  const [review, setReview] = useState({});

  const { reviewId } = useParams();

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
        <button className="form-btn btn-secondary">Edit Review</button>
      </div>
    </form>
  );
};
