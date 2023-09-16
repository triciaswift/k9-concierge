export const getAllCategories = () => {
  return fetch(`http://localhost:8088/categories`).then((res) => res.json());
};

export const getCategoryById = (categoryId) => {
  return fetch(`http://localhost:8088/categories/${categoryId}`).then((res) =>
    res.json()
  );
};
