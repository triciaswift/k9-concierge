import { useEffect, useState } from "react";
import "./Form.css";
import { getAllCategories } from "../../services/categoryService";
import { postLocation } from "../../services/locationService";
import { useNavigate } from "react-router-dom";
import { getAllCities } from "../../services/cityService";

export const NewLocation = ({ currentUser }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [catAlphabetically, setCatAlphabetically] = useState([]);
  const [cityAlphabetically, setCityAlphabetically] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    website: "",
    offeredServices: "",
    categoryId: 0,
    userId: 0,
    cityId: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((catArr) => {
      setAllCategories(catArr);
    });

    getAllCities().then((cityArr) => {
      setAllCities(cityArr);
    });
  }, []);

  useEffect(() => {
    let sortedCategories = allCategories.sort((c1, c2) =>
      c1.name > c2.name ? 1 : c1.name < c2.name ? -1 : 0
    );
    setCatAlphabetically(sortedCategories);

    let sortedCities = allCities.sort((c1, c2) =>
      c1.name > c2.name ? 1 : c1.name < c2.name ? -1 : 0
    );
    setCityAlphabetically(sortedCities);
  }, [allCategories, allCities]);

  const handleInputChange = (event) => {
    const locationCopy = { ...newLocation };
    locationCopy[event.target.name] = event.target.value;
    setNewLocation(locationCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    let locationItem = {
      name: newLocation.name,
      address: newLocation.address,
      phoneNumber: newLocation.phoneNumber,
      website: newLocation.website,
      offeredServices: newLocation.offeredServices,
      categoryId: parseInt(newLocation.categoryId),
      userId: currentUser.id,
      cityId: parseInt(newLocation.cityId),
    };

    const string = newLocation.offeredServices.replace(", ", ",");
    const array = string.split(",");
    locationItem.offeredServices = array;

    postLocation(locationItem).then(() => {
      navigate(`/category/${newLocation.categoryId}`);
    });
  };

  return (
    <form onSubmit={handleSave}>
      <h2 className="page-header">New Location</h2>
      <fieldset className="location-group">
        <div className="form-group group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newLocation.name}
            className="form-control"
            placeholder="Name of location (e.g. Vet Name)"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={newLocation.phoneNumber}
            className="form-control"
            placeholder="(e.g. 800-555-5555)"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group group">
          <div>Category:</div>
          <select
            // className="form-control"
            name="categoryId"
            value={newLocation.categoryId}
            required
            onChange={handleInputChange}
          >
            <option value={""}>Please select a category</option>
            {catAlphabetically.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>
      <fieldset className="location-group">
        <div className="form-group group-two">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={newLocation.address}
            className="form-control"
            placeholder="Address (e.g. 5555 Main Street)"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group group-two">
          <div>City:</div>
          <select
            // className="form-control"
            name="cityId"
            value={newLocation.cityId}
            required
            onChange={handleInputChange}
          >
            <option value={""}>Please select a city</option>
            {cityAlphabetically.map((city) => {
              return (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group group-two">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={newLocation.website}
            className="form-control"
            placeholder="Website Url (e.g. www.vet.com)"
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
            value={newLocation.offeredServices}
            className="form-body"
            placeholder="List any services offered (e.g. Vaccines, Surgery, Dental Care, etc.)"
            onChange={handleInputChange}
          ></textarea>
        </div>
      </fieldset>
      <div className="form-group">
        <button className="form-btn btn-secondary" type="submit">
          Save New Location
        </button>
      </div>
    </form>
  );
};
