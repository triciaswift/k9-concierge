import "./Form.css";

export const NewComment = () => {
  return (
    <form className="form-container">
      <div className="form-group form-review">
        <label>Leave Comment:</label>
        <textarea
          name="body"
          rows="4"
          cols="50"
          // value={newReview.body}
          className="form-body"
          // onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group form-review">
        <button className="btn-primary btn-review">Save Comment</button>
      </div>
    </form>
  );
};
