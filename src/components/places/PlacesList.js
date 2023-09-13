import { useEffect, useState } from "react";
import "./Places.css";
import { getAllPlaces } from "../../services/placeService";
import { useParams } from "react-router-dom";

export const PlacesList = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [placesByCategory, setPlacesByCategory] = useState([]);

  const { categoryId, categoryName } = useParams();

  useEffect(() => {
    getAllPlaces().then((placesArr) => {
      setAllPlaces(placesArr);
    });
  }, []);

  useEffect(() => {
    const filteredByCategory = allPlaces.filter(
      (place) => place.categoryId === parseInt(categoryId)
    );
    setPlacesByCategory(filteredByCategory);
  }, [categoryId, allPlaces]);

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
    <div>
      <h2 className="page-header">{categoryName}</h2>
      <section className="places-container">
        {placesByCategory.map((placeObj) => {
          return (
            <div className="place-card" key={placeObj.id}>
              <div className="place-name">{placeObj.name}</div>
              <div className="place-rating">
                {handleRatingAverage(placeObj)} Stars
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
