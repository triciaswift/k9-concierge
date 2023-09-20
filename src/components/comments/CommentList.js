import { useNavigate } from "react-router-dom";
import "./Comments.css";

export const CommentList = ({ currentUser, comments }) => {
  const navigate = useNavigate();

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
                <button className="btn-primary btn-comment">
                  Edit Comment
                </button>
                <button className="btn-warning btn-comment">
                  Delete Comment
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};
