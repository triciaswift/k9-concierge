import { useEffect, useState } from "react";
import "./Locations.css";
import { getLocationById } from "../../services/locationService";
import { useNavigate, useParams } from "react-router-dom";
import { Reviews } from "../reviews/Reviews";
import {
  addFavorite,
  getFavoriteByUserIdAndLocationId,
} from "../../services/favoritesService";

export const LocationDetails = ({ currentUser }) => {
  const [location, setLocation] = useState({});
  const [userId, setUserId] = useState(0);
  const [userFavorite, setUserFavorite] = useState({});
  const { locationId } = useParams(); // this is a string

  const navigate = useNavigate();

  const getLocation = () => {
    getLocationById(locationId).then((locationObj) => {
      setLocation(locationObj);
    });
  };

  //! ignore squiggles, would give an infinite loop
  useEffect(() => {
    getLocation();
    getFavoriteByUserIdAndLocationId(currentUser.id, locationId).then(
      (favoriteObj) => {
        setUserFavorite(favoriteObj);
      }
    );
  }, [currentUser, locationId]);

  useEffect(() => {
    const filteredReview = location.reviews?.find(
      (review) => review.userId === currentUser.id
    );
    setUserId(filteredReview?.userId);
  }, [currentUser, location]);

  const handleFavorite = () => {
    const newFavorite = {
      userId: currentUser.id,
      locationId: parseInt(locationId),
    };

    addFavorite(newFavorite).then(() => {
      navigate(`/favorites`);
    });
  };

  return (
    <>
      <h2 className="page-header">
        <button
          className="arrow-emoji arrow-btn"
          onClick={() => {
            navigate(`/category/${location.categoryId}`);
          }}
        >
          <i className="fa-solid fa-circle-arrow-left"></i>
        </button>
        {location.name}
        {userFavorite ? (
          ""
        ) : (
          <button className="heart-emoji" onClick={handleFavorite}>
            <i className="fa-solid fa-heart" />
          </button>
        )}
      </h2>
      <section className="location-container">
        <div className="location-description">
          <div>
            <span className="location-info">Address: </span>
            {location.address}
          </div>
          <div>
            <span className="location-info">Phone Number: </span>
            {location.phoneNumber}
          </div>
          <div>
            <span className="location-info">Website: </span>
            {location.website}
          </div>
        </div>
        <div className="location-services">
          <span className="location-info">Offered Services: </span>
          <ul className="services">
            {location.offeredServices
              ? location.offeredServices?.map((service, index) => {
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
                className="btn btn-secondary"
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
          {location.reviews
            ? location.reviews.map((review) => {
                return (
                  <Reviews
                    reviewId={review.id}
                    currentUser={currentUser}
                    getLocation={getLocation}
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
