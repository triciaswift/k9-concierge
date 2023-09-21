import { useEffect, useState } from "react";
import "./Favorites.css";
import {
  deleteFavorite,
  getFavoritesByUserId,
} from "../../services/favoritesService";
import { useNavigate } from "react-router-dom";

export const FavoriteList = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const getAllFavorites = () => {
    getFavoritesByUserId(currentUser.id).then((favoritesArr) => {
      setFavorites(favoritesArr);
    });
  };

  useEffect(() => {
    getAllFavorites();
  }, [currentUser]);

  const handleDelete = (favId) => {
    deleteFavorite(favId).then(() => {
      getAllFavorites();
    });
  };

  return (
    <>
      <h2 className="page-header">Favorites</h2>
      <section className="favorites-container">
        {favorites.map((favObj) => {
          return (
            <div className="favorite-card" key={favObj.id} value={favObj.id}>
              <div
                className="favorite-name"
                onClick={() => {
                  navigate(`/place/${favObj.placeId}`);
                }}
              >
                {favObj.place?.name}
              </div>
              <button
                className="btn btn-secondary btn-favorite"
                onClick={() => {
                  handleDelete(favObj.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
};
