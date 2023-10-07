export const getFavoritesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/favorites?_expand=location&userId=${userId}`
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

export const getFavoriteByUserIdAndLocationId = (userId, locationId) => {
  return fetch(
    `http://localhost:8088/favorites/?userId=${userId}&locationId=${locationId}`
  )
    .then((res) => res.json())
    .then((data) => data[0]);
};
