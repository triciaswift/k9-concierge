import { useEffect, useState } from "react";
import "./Places.css";
import { getPlacesByCategoryId } from "../../services/placeService";
import { useNavigate, useParams } from "react-router-dom";

export const PlacesList = () => {
  const [places, setPlaces] = useState([]);

  const { categoryId, categoryName } = useParams(); // this is a string

  const navigate = useNavigate();

  useEffect(() => {
    getPlacesByCategoryId(categoryId).then((placesArr) => {
      setPlaces(placesArr);
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
      <h2 className="page-header">{categoryName}</h2>
      <section className="places-container">
        {places.map((placeObj) => {
          return (
            <div
              className="place-card"
              key={placeObj.id}
              onClick={() => {
                navigate(`/details/${placeObj.id}`);
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
