import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import { useState } from "react";
import { postReview } from "../../services/reviewService";
import { getDate } from "../../services/dateService";

export const NewReview = ({ currentUser }) => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    body: "",
    date: "",
    userId: 0,
    placeId: 0,
  });
  const { placeId } = useParams();
  const navigate = useNavigate();

  const ratingNumbers = [1, 2, 3, 4, 5];

  const handleInputChange = (event) => {
    const reviewCopy = { ...newReview };
    reviewCopy[event.target.name] = event.target.value;
    setNewReview(reviewCopy);
  };

  //! Play with the preventDefault() feature to see if necessary or not
  const handleSave = (event) => {
    event.preventDefault();

    if (newReview.rating && newReview.body) {
      const newPlaceReview = {
        rating: parseInt(newReview.rating),
        body: newReview.body,
        date: getDate(),
        userId: currentUser.id,
        placeId: parseInt(placeId),
      };

      postReview(newPlaceReview).then(() => {
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
          <label>Body:</label>
          <textarea
            name="body"
            rows="4"
            cols="50"
            value={newReview.body}
            className="form-body"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </fieldset>
      <div className="form-btn-container">
        <button
          className="arrow-emoji"
          onClick={() => {
            navigate(`/place/${placeId}`);
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
