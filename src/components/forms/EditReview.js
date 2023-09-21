import { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate, useParams } from "react-router-dom";
import { editReview, getReviewById } from "../../services/reviewService";
import { getDate } from "../../services/dateService";

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

  const handleSave = (event) => {
    event.preventDefault();

    if (review.rating && review.body) {
      const updateReview = {
        id: review.id,
        rating: parseInt(review.rating),
        body: review.body,
        date: getDate(),
        userId: review.userId,
        placeId: review.placeId,
      };

      editReview(updateReview).then(() => {
        navigate(-1);
      });
    } else {
      window.alert(`Please fill out all fields.`);
    }
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
      <div className="form-btn-container">
        <button
          className="arrow-emoji"
          onClick={() => {
            navigate(`/place/${review.placeId}`);
          }}
        >
          <i className="fa-solid fa-circle-arrow-left"></i>
        </button>
        <button className="form-btn btn-secondary" onClick={handleSave}>
          Save Review
        </button>
      </div>
    </form>
  );
};
