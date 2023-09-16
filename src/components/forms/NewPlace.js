import { useEffect, useState } from "react";
import "./Form.css";
import { getAllCategories } from "../../services/categoryService";

export const NewPlace = ({ currentUser }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [newPlace, setNewPlace] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
    offeredServices: [],
    categoryId: 0,
    userId: 0,
  });

  useEffect(() => {
    getAllCategories().then((catArr) => {
      setAllCategories(catArr);
    });
  }, []);

  const handleInputChange = (event) => {
    const reviewCopy = { ...newPlace };
    reviewCopy[event.target.name] = event.target.value;
    setNewPlace(reviewCopy);
  };

  return (
    <form>
      <h2 className="page-header">New Place</h2>
      <fieldset className="place-group">
        <div className="form-group group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newPlace.name}
            className="form-control"
            placeholder="Name of place (e.g. PetVet)"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={newPlace.phoneNumber}
            className="form-control"
            placeholder="(e.g. 800-555-5555)"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group group">
          <div>Category:</div>
          <select
            name="categoryId"
            value={newPlace.categoryId}
            required
            onChange={handleInputChange}
          >
            <option value={0}>Please select a category</option>
            {allCategories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset className="place-group">
        <div className="form-group group-two">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={newPlace.address}
            className="form-control"
            placeholder="Address (e.g. 5555 Main Street)"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group group-two">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={newPlace.website}
            className="form-control"
            placeholder="Website Url (e.g. www.petvet.com)"
            required
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Offered Services:</label>
          <textarea
            name="body"
            rows="4"
            cols="50"
            value={newPlace.body}
            className="form-body"
            placeholder="List any services offered (e.g. Vaccines, Surgery, Dental Care, etc.)"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </fieldset>
      <div className="form-group">
        <button className="form-btn btn-secondary">Save Review</button>
      </div>
    </form>
  );
};
