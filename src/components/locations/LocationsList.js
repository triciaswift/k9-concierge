import { useEffect, useState } from "react";
import "./Locations.css";
import { getLocationByCategoryId } from "../../services/locationService";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "../../services/categoryService";

export const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState([]);

  const { categoryId } = useParams(); // this is a string

  const navigate = useNavigate();

  useEffect(() => {
    getLocationByCategoryId(categoryId).then((locationsArr) => {
      setLocations(locationsArr);
    });

    getCategoryById(categoryId).then((catObj) => {
      setCategory(catObj);
    });
  }, [categoryId]);

  const handleRatingAverage = (location) => {
    let sum = 0;
    let average = 0;
    for (let i = 0; i < location.reviews.length; i++) {
      sum += location.reviews[i].rating;
    }
    average = Math.round(sum / location.reviews?.length);

    return average;
  };

  return (
    <>
      <div className="category-header-container">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="category-img-two"
        />
        <h2 className="page-header">{category.name}</h2>
        <img
          src={category.imageUrl}
          alt={category.name}
          className="category-img-two"
        />
      </div>
      <section className="locations-container">
        {locations.map((locationObj) => {
          return (
            <div
              className="location-card"
              key={locationObj.id}
              onClick={() => {
                navigate(`/location/${locationObj.id}`);
              }}
            >
              <div className="location-name">{locationObj.name}</div>
              <div className="location-rating">
                {handleRatingAverage(locationObj)
                  ? `${handleRatingAverage(locationObj)} Stars`
                  : "No ratings yet"}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
