export const getPlacesByCategoryId = (categoryId) => {
  return fetch(
    `http://localhost:8088/places?categoryId=${categoryId}&_embed=reviews`
  ).then((res) => res.json());
};

export const getPlaceById = (placeId) => {
  return fetch(`http://localhost:8088/places/${placeId}?_embed=reviews`).then(
    (res) => res.json()
  );
};
