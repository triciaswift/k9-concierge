export const getReviewById = (reviewId) => {
  return fetch(`http://localhost:8088/reviews/${reviewId}?_expand=user`).then(
    (res) => res.json()
  );
};

export const deleteReview = (reviewId) => {
  return fetch(`http://localhost:8088/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
