import { useEffect, useState } from "react";
import "./Favorites.css";
import { getFavoritesByUserId } from "../../services/favoritesService";
import { useNavigate } from "react-router-dom";

export const FavoriteList = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getFavoritesByUserId(currentUser.id).then((favoritesArr) => {
      setFavorites(favoritesArr);
    });
  }, []);

  return (
    <>
      <h2 className="page-header">Favorites</h2>
      <section className="favorites-container">
        {favorites.map((favObj) => {
          return (
            <div
              className="favorite-card"
              key={favObj.id}
              onClick={() => {
                navigate(`/place/${favObj.placeId}`);
              }}
            >
              <div className="favorite-name">{favObj.place?.name}</div>
              <button className="btn btn-secondary">Delete</button>
            </div>
          );
        })}
      </section>
    </>
  );
};
