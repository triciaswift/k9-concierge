import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";

export const Profile = ({ currentUser }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId).then((userObj) => {
      setUser(userObj);
    });
  }, [userId]);

  return (
    <div className="user-container">
      <h2 className="page-header">{user.fullName}</h2>
      <div className="user-info">
        <span className="user-detail">Reviews Written: </span>
        {user.reviews?.length ? user.reviews.length : 0}
      </div>
      <div className="dog-container">
        <div className="dog-info">
          {user.dogName ? (
            <h3 className="page-header dog-name">{user.dogName}</h3>
          ) : (
            ""
          )}
          {user.dogBreed ? <h3 className="dog-breed">{user.dogBreed}</h3> : ""}
          {currentUser.id === parseInt(userId) ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/profile/${userId}/edit`);
              }}
            >
              Edit Profile
            </button>
          ) : (
            ""
          )}
        </div>
        {user.dogUrl ? (
          <div className="img-container">
            <img src={user.dogUrl} alt={user.dogName} className="dog-img" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
