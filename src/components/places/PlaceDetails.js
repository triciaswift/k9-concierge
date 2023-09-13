import { useEffect, useState } from "react";
import "./Places.css";
import { getPlaceById } from "../../services/placeService";
import { useParams } from "react-router-dom";
import { Reviews } from "../reviews/Reviews";

export const PlaceDetails = () => {
  const [place, setPlace] = useState({});

  const { placeId } = useParams(); // this is a string

  useEffect(() => {
    getPlaceById(placeId).then((placeObj) => {
      setPlace(placeObj);
    });
  }, [placeId]);

  return (
    <>
      <h2 className="page-header">{place.name}</h2>
      <section className="place-container">
        <div>
          <span className="place-info">Address: </span>
          {place.address}
        </div>
        <div>
          <span className="place-info">Phone Number: </span>
          615-{place.phoneNumber}
        </div>
        <div>
          <span className="place-info">Website: </span>
          {place.website}
        </div>
        <div>
          <span className="place-info">Offered Services: </span>
          {place.offeredServices?.map((service) => {
            return (
              <ul className="services">
                <li className="service-item">{service}</li>
              </ul>
            );
          })}
        </div>
      </section>
      <section className="reviews-container">
        <header>
          <h2 className="page-header">
            Reviews
            <button>Add Review</button>
          </h2>
        </header>
        <div className="reviews">
          {place.reviews?.map((review) => {
            return <Reviews reviewId={review.id} key={review.id} />;
          })}
        </div>
      </section>
    </>
  );
};
