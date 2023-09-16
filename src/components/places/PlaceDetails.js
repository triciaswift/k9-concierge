import { useEffect, useState } from "react";
import "./Places.css";
import { getPlaceById } from "../../services/placeService";
import { useNavigate, useParams } from "react-router-dom";
import { Reviews } from "../reviews/Reviews";

export const PlaceDetails = ({ currentUser }) => {
  const [place, setPlace] = useState({});
  const [userId, setUserId] = useState(0);
  const { placeId } = useParams(); // this is a string

  const navigate = useNavigate();

  const getPlace = () => {
    getPlaceById(placeId).then((placeObj) => {
      setPlace(placeObj);
    });
  };

  useEffect(() => {
    getPlace();
  }, []);

  useEffect(() => {
    const filteredReview = place.reviews?.find(
      (review) => review.userId === currentUser.id
    );
    setUserId(filteredReview?.userId);
  }, [currentUser, place]);

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
            {userId ? (
              ""
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(`review`);
                }}
              >
                Add Review
              </button>
            )}
          </div>
        </header>
        <div className="reviews">
          {place.reviews
            ? place.reviews.map((review) => {
                return (
                  <Reviews
                    reviewId={review.id}
                    currentUser={currentUser}
                    getPlace={getPlace}
                    key={review.id}
                  />
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};
