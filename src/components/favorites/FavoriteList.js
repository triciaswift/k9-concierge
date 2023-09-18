import { useEffect, useState } from "react";
import "./Favorites.css";
import { getFavoritesByUserId } from "../../services/favoritesService";

export const FavoriteList = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);

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
              //   onClick={() => {
              //     navigate(`/place/${placeObj.id}`);
              //   }}
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
