import { useState } from "react";
import "./Form.css";
import { getDate } from "../../services/dateService";
import { editComment } from "../../services/commentService";

export const EditComment = ({
  userComment,
  renderComments,
  handleEditCommentView,
}) => {
  const [updatedComment, setUpdatedComment] = useState(userComment);

  const handleInputChange = (event) => {
    const commentCopy = { ...updatedComment };
    commentCopy[event.target.name] = event.target.value;
    setUpdatedComment(commentCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const editedComment = {
      id: updatedComment.id,
      comment: updatedComment.comment,
      date: getDate(),
      userId: updatedComment.userId,
      reviewId: updatedComment.reviewId,
    };

    editComment(editedComment).then(() => {
      renderComments();
      handleEditCommentView();
    });
  };

  return (
    <form className="form-container">
      <div className="form-group form-review">
        <label>Edit Comment:</label>
        <textarea
          name="comment"
          rows="4"
          cols="50"
          value={updatedComment.comment}
          className="form-body"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group form-review">
        <button className="btn-secondary btn-comment" onClick={handleSave}>
          Save Comment
        </button>
      </div>
    </form>
  );
};
