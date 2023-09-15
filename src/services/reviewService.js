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

export const editReview = (review) => {
  return fetch(`http://localhost:8088/reviews/${review.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
};
