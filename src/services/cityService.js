export const getAllCities = () => {
  return fetch(`http://localhost:8088/cities`).then((res) => res.json());
};
