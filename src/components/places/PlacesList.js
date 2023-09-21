import { useEffect, useState } from "react";
import "./Places.css";
import { getPlacesByCategoryId } from "../../services/placeService";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "../../services/categoryService";

export const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState([]);

  const { categoryId } = useParams(); // this is a string

  const navigate = useNavigate();

  useEffect(() => {
    getPlacesByCategoryId(categoryId).then((placesArr) => {
      setPlaces(placesArr);
    });

    getCategoryById(categoryId).then((catObj) => {
      setCategory(catObj);
    });
  }, [categoryId]);

  const handleRatingAverage = (place) => {
    let sum = 0;
    let average = 0;
    for (let i = 0; i < place.reviews.length; i++) {
      sum += place.reviews[i].rating;
    }
    average = Math.round(sum / place.reviews?.length);

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
      <section className="places-container">
        {places.map((placeObj) => {
          return (
            <div
              className="place-card"
              key={placeObj.id}
              onClick={() => {
                navigate(`/place/${placeObj.id}`);
              }}
            >
              <div className="place-name">{placeObj.name}</div>
              <div className="place-rating">
                {handleRatingAverage(placeObj)
                  ? `${handleRatingAverage(placeObj)} Stars`
                  : "No ratings yet"}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
