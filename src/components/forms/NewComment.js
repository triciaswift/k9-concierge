import { useState } from "react";
import "./Form.css";
import { getDate } from "../../services/dateService";
import { postComment } from "../../services/commentService";

export const NewComment = ({
  reviewId,
  currentUser,
  handleNewComment,
  renderComments,
}) => {
  const [newComment, setNewComment] = useState({ comment: "" });

  const handleInputChange = (event) => {
    const commentCopy = { ...newComment };
    commentCopy[event.target.name] = event.target.value;
    setNewComment(commentCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newUserComment = {
      comment: newComment.comment,
      date: getDate(),
      userId: currentUser.id,
      reviewId: reviewId,
    };

    postComment(newUserComment).then(() => {
      handleNewComment();
      renderComments();
    });
  };
  return (
    <form className="form-container">
      <div className="form-group form-review">
        <label>Leave Comment:</label>
        <textarea
          name="comment"
          rows="4"
          cols="50"
          value={newComment.comment}
          className="form-body"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group form-review">
        <button className="btn-primary btn-comment" onClick={handleSave}>
          Save Comment
        </button>
      </div>
    </form>
  );
};
