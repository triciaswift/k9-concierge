import { useEffect, useState } from "react";
import "./Reviews.css";
import { deleteReview, getReviewById } from "../../services/reviewService";
import { useNavigate } from "react-router-dom";
import { CommentList } from "../comments/CommentList";
import { getCommentsByUserId } from "../../services/commentService";
import { NewComment } from "../forms/NewComment";

export const Reviews = ({ reviewId, currentUser, getLocation }) => {
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setForm] = useState(false);

  const navigate = useNavigate();

  const renderComments = () => {
    getCommentsByUserId(reviewId).then((commentArr) => {
      setComments(commentArr);
    });
  };

  useEffect(() => {
    getReviewById(reviewId).then((reviewObj) => {
      setReview(reviewObj);
    });
    renderComments();
  }, [reviewId]);

  const handleDelete = () => {
    deleteReview(reviewId).then(() => {
      getLocation();
    });
  };

  useEffect(() => {
    const findUserComment = comments.find(
      (comment) => comment.userId === currentUser.id
    );

    setUserComment(findUserComment);
  }, [currentUser, comments]);

  const handleComments = () => {
    setShowComments(!showComments);
  };

  const handleNewComment = () => {
    setForm(!showCommentForm);
  };

  const handleNumberOfComments = () => {
    const numOfComments = comments.length;
    if (numOfComments > 1 || numOfComments === 0) {
      return numOfComments + " Comments";
    } else {
      return numOfComments + " Comment";
    }
  };

  return (
    <div className="review-card">
      <>
        <div className="review-group">
          <div
            className="review-name"
            onClick={() => {
              navigate(`/profile/${review.userId}`);
            }}
          >
            <span className="review-info">Name: </span>
            {review.user?.fullName}
          </div>
          <div>
            <span className="review-info">Date: </span>
            {review.date}
          </div>
        </div>
        <div>
          <span className="review-info">Rating: </span>
          {review.rating} Stars
        </div>
        <div>
          <span className="review-info">Review: </span>
          {review.body}
        </div>
      </>

      <div className="comments-container">
        <div className="comment-number" onClick={handleComments}>
          {handleNumberOfComments()}
        </div>
        {currentUser.id === review?.userId ||
        currentUser.id === userComment?.userId ? (
          ""
        ) : (
          <button className="comment-btn" onClick={handleNewComment}>
            <i className="fa-solid fa-comment"></i>
            Comment
          </button>
        )}
      </div>

      {showComments ? (
        <div className="comment-container">
          <CommentList
            comments={comments}
            currentUser={currentUser}
            renderComments={renderComments}
          />
        </div>
      ) : (
        ""
      )}

      {showCommentForm ? (
        <NewComment
          reviewId={reviewId}
          currentUser={currentUser}
          handleNewComment={handleNewComment}
          renderComments={renderComments}
        />
      ) : (
        ""
      )}

      {currentUser.id === review.userId ? (
        <div className="btn-container-two">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/review/${review.id}`);
            }}
          >
            Edit
          </button>
          <button className="btn btn-warning" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
