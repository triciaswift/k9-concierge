export const getCommentsByUserId = (reviewId) => {
  return fetch(
    `http://localhost:8088/comments/?reviewId=${reviewId}&_expand=user`
  ).then((res) => res.json());
};
