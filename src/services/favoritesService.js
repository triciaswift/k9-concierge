export const getFavoritesByUserId = (userId) => {
  return fetch(
    `http://localhost:8088/favorites?_expand=place&userId=${userId}`
  ).then((res) => res.json());
};

export const deleteFavorite = (favorite) => {
  return fetch(`http://localhost:8088/favorites/${favorite.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
