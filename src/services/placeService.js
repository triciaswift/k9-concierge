export const getPlacesByCategoryId = (categoryId) => {
  return fetch(
    `http://localhost:8088/places?categoryId=${categoryId}&_embed=reviews`
  ).then((res) => res.json());
};
