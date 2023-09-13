export const getAllPlaces = () => {
  return fetch(`http://localhost:8088/places?_embed=reviews`).then((res) =>
    res.json()
  );
};
