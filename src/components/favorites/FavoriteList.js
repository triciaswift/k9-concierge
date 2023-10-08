import { useEffect, useState } from "react";
import "./Favorites.css";
import {
  deleteFavorite,
  getFavoritesByUserId,
} from "../../services/favoritesService";
import { useNavigate } from "react-router-dom";

export const FavoriteList = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesAlphabetically, setFavAlphabetically] = useState([]);
  const navigate = useNavigate();

  const getAllFavorites = () => {
    getFavoritesByUserId(currentUser.id).then((favoritesArr) => {
      setFavorites(favoritesArr);
    });
  };

  useEffect(() => {
    getAllFavorites();
  }, [currentUser]);

  useEffect(() => {
    let sortedFavorites = favorites.sort((c1, c2) =>
      c1.location.name > c2.location.name
        ? 1
        : c1.location.name < c2.location.name
        ? -1
        : 0
    );
    setFavAlphabetically(sortedFavorites);
  }, [favorites]);

  const handleDelete = (favId) => {
    deleteFavorite(favId).then(() => {
      getAllFavorites();
    });
  };

  return (
    <>
      <h2 className="page-header">Favorites</h2>
      <section className="favorites-container">
        {favoritesAlphabetically.map((favObj) => {
          return (
            <div className="favorite-card" key={favObj.id} value={favObj.id}>
              <div
                className="favorite-name"
                onClick={() => {
                  navigate(`/location/${favObj.locationId}`);
                }}
              >
                {favObj.location?.name}
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
