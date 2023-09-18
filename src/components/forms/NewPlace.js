import { useEffect, useState } from "react";
import "./Form.css";
import { getAllCategories } from "../../services/categoryService";
import { postPlace } from "../../services/placeService";
import { useNavigate } from "react-router-dom";

export const NewPlace = ({ currentUser }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [newPlace, setNewPlace] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
    offeredServices: "",
    categoryId: 0,
    userId: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((catArr) => {
      setAllCategories(catArr);
    });
  }, []);

  const handleInputChange = (event) => {
    const placeCopy = { ...newPlace };
    placeCopy[event.target.name] = event.target.value;
    setNewPlace(placeCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    let placeItem = {
      name: newPlace.name,
      address: newPlace.address,
      phoneNumber: newPlace.phoneNumber,
      website: newPlace.website,
      offeredServices: newPlace.offeredServices,
      categoryId: parseInt(newPlace.categoryId),
      userId: currentUser.id,
    };

    if (
      newPlace.name &&
      newPlace.address &&
      newPlace.phoneNumber &&
      newPlace.website &&
      newPlace.offeredServices &&
      newPlace.categoryId
    ) {
      const string = newPlace.offeredServices.replace(", ", ",");
      const array = string.split(",");
      placeItem.offeredServices = array;

      postPlace(placeItem).then(() => {
        navigate(`/category/${newPlace.categoryId}`);
      });
    } else if (
      newPlace.name &&
      newPlace.address &&
      newPlace.phoneNumber &&
      newPlace.website &&
      !newPlace.offeredServices &&
      newPlace.categoryId
    ) {
      postPlace(placeItem).then(() => {
        navigate(`/category/${newPlace.categoryId}`);
      });
    } else {
      window.alert(
        `Please fill out all fields, "Offered Services" is optional.`
      );
    }
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
            name="offeredServices"
            rows="4"
            cols="50"
            value={newPlace.offeredServices}
            className="form-body"
            placeholder="List any services offered (e.g. Vaccines, Surgery, Dental Care, etc.)"
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
