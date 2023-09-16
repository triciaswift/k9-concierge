import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
import { useState } from "react";
import { postReview } from "../../services/reviewService";

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

  const handleDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const ratingNumbers = [1, 2, 3, 4, 5];

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
      date: handleDate(),
      userId: currentUser.id,
      placeId: parseInt(placeId),
    };

    postReview(newPlaceReview).then(() => {
      navigate(`/place/${placeId}`);
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
      <div className="form-group">
        <button className="form-btn btn-secondary" onClick={handleSave}>
          Save Review
        </button>
      </div>
    </form>
  );
};
