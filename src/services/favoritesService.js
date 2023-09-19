export const getFavoritesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/favorites?_expand=place&userId=${userId}`
  ).then((res) => res.json());
};

export const deleteFavorite = (favoriteId) => {
  return fetch(`http://localhost:8088/favorites/${favoriteId}`, {
    method: "DELETE",
  });
};

export const addFavorite = (favorite) => {
  return fetch(`http://localhost:8088/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorite),
  });
};

export const getFavoriteByUserIdAndPlaceId = (userId, placeId) => {
  return fetch(
    `http://localhost:8088/favorites/?userId=${userId}&placeId=${placeId}`
  )
    .then((res) => res.json())
    .then((data) => data[0]);
};
