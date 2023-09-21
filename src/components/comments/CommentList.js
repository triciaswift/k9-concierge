import { useNavigate } from "react-router-dom";
import "./Comments.css";
import { deleteComment } from "../../services/commentService";
import { EditComment } from "../forms/EditComment";
import { useState } from "react";

export const CommentList = ({ currentUser, comments, renderComments }) => {
  const [showEditComment, setShowEditComment] = useState(false);
  const [userComment, setUserComment] = useState({});
  const navigate = useNavigate();

  const handleDelete = (commentId) => {
    deleteComment(commentId).then(() => {
      renderComments();
    });
  };

  const handleEditCommentView = () => {
    setShowEditComment(!showEditComment);
  };

  const handleUserComment = (commentObj) => {
    setUserComment(commentObj);
  };

  return (
    <>
      {comments.map((comment) => {
        return (
          <div className="comment-card" key={comment.id}>
            <div className="review-group">
              <div
                className="review-name"
                onClick={() => {
                  navigate(`/profile/${comment.userId}`);
                }}
              >
                <span className="review-info">Name: </span>
                {comment.user?.fullName}
              </div>
              <div>
                <span className="comment-info">Date: </span>
                {comment.date}
              </div>
            </div>
            <div className="comment-body">{comment.comment}</div>
            {currentUser.id === comment.userId ? (
              <div className="button-container">
                <button
                  className="btn-primary btn-comment"
                  onClick={() => {
                    handleEditCommentView();
                    handleUserComment(comment);
                  }}
                >
                  Edit Comment
                </button>
                <button
                  className="btn-warning btn-comment"
                  onClick={() => {
                    handleDelete(comment.id);
                    setShowEditComment(false);
                  }}
                >
                  Delete Comment
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
      {showEditComment ? (
        <EditComment
          userComment={userComment}
          renderComments={renderComments}
          handleEditCommentView={handleEditCommentView}
        />
      ) : (
        ""
      )}
    </>
  );
};
