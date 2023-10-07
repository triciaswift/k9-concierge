export const getLocationByCategoryId = (categoryId) => {
  return fetch(
    `http://localhost:8088/locations?categoryId=${categoryId}&_embed=reviews`
  ).then((res) => res.json());
};

export const getLocationById = (locationId) => {
  return fetch(
    `http://localhost:8088/locations/${locationId}?_embed=reviews`
  ).then((res) => res.json());
};

export const postLocation = (location) => {
  return fetch(`http://localhost:8088/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  });
};
