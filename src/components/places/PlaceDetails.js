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
        </div>
        <div className="place-description">
          <span className="place-info">Offered Services: </span>
          <ul className="services">
            {place.offeredServices
              ? place.offeredServices?.map((service, index) => {
                  return (
                    <li className="service-item" key={index}>
                      {service}
                    </li>
                  );
                })
              : `No special services offered, call for more details`}
          </ul>
        </div>
      </section>
      <section className="reviews-container">
        <header className="header-container">
          <h2 className="page-header review-header">Reviews</h2>
          <div className="btn-container">
            <button className="btn btn-secondary">Add Review</button>
          </div>
        </header>
        <div className="reviews">
          {place.reviews
            ? place.reviews.map((review) => {
                return <Reviews reviewId={review.id} key={review.id} />;
              })
            : ""}
        </div>
      </section>
    </>
  );
};
