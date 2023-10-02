import { useEffect, useState } from "react";
import "./Places.css";
import { getPlaceById } from "../../services/placeService";
import { useNavigate, useParams } from "react-router-dom";
import { Reviews } from "../reviews/Reviews";
import {
  addFavorite,
  getFavoriteByUserIdAndPlaceId,
} from "../../services/favoritesService";

export const PlaceDetails = ({ currentUser }) => {
  const [place, setPlace] = useState({});
  const [userId, setUserId] = useState(0);
  const [userFavorite, setUserFavorite] = useState({});
  const { placeId } = useParams(); // this is a string

  const navigate = useNavigate();

  const getPlace = () => {
    getPlaceById(placeId).then((placeObj) => {
      setPlace(placeObj);
    });
  };

  //! ignore squiggles, would give an infinite loop
  useEffect(() => {
    getPlace();
    getFavoriteByUserIdAndPlaceId(currentUser.id, placeId).then(
      (favoriteObj) => {
        setUserFavorite(favoriteObj);
      }
    );
  }, [currentUser, placeId]);

  useEffect(() => {
    const filteredReview = place.reviews?.find(
      (review) => review.userId === currentUser.id
    );
    setUserId(filteredReview?.userId);
  }, [currentUser, place]);

  const handleFavorite = () => {
    const newFavorite = {
      userId: currentUser.id,
      placeId: parseInt(placeId),
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
            navigate(`/category/${place.categoryId}`);
          }}
        >
          <i className="fa-solid fa-circle-arrow-left"></i>
        </button>
        {place.name}
        {userFavorite ? (
          ""
        ) : (
          <button className="heart-emoji" onClick={handleFavorite}>
            <i className="fa-solid fa-heart" />
          </button>
        )}
      </h2>
      <section className="place-container">
        <div className="place-description">
          <div>
            <span className="place-info">Address: </span>
            {place.address}
          </div>
          <div>
            <span className="place-info">Phone Number: </span>
            {place.phoneNumber}
          </div>
          <div>
            <span className="place-info">Website: </span>
            {place.website}
          </div>
        </div>
        <div className="place-services">
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
