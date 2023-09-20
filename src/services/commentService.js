export const getCommentsByUserId = (reviewId) => {
  return fetch(
    `http://localhost:8088/comments/?reviewId=${reviewId}&_expand=user`
  ).then((res) => res.json());
};

export const postComment = (commentObj) => {
  return fetch(`http://localhost:8088/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  });
};

export const deleteComment = (commentId) => {
  return fetch(`http://localhost:8088/comments/${commentId}`, {
    method: "DELETE",
  });
};
