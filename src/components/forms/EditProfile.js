import { useEffect, useState } from "react";
import "./Form.css";
import { editUser, getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getUserById(currentUser.id).then((userObj) => {
      setUser(userObj);
    });
  }, [currentUser]);

  const handleInputChange = (event) => {
    const userCopy = { ...user };
    userCopy[event.target.name] = event.target.value;
    setUser(userCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (user.fullName) {
      const updateUser = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        dogBreed: user.dogBreed,
        dogName: user.dogName,
        dogUrl: user.dogUrl,
      };

      editUser(updateUser).then(() => {
        navigate(`/profile/${user.id}`);
      });
    } else {
      window.alert(`Please fill out "Name".`);
    }
  };

  return (
    <form>
      <h2 className="page-header">Edit Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName ? user.fullName : ""}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Dog's Name</label>
          <input
            type="text"
            name="dogName"
            value={user.dogName ? user.dogName : ""}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Dog's Breed</label>
          <input
            type="text"
            name="dogBreed"
            value={user.dogBreed ? user.dogBreed : ""}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Dog's Picture</label>
          <input
            type="text"
            name="dogUrl"
            value={user.dogUrl ? user.dogUrl : ""}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <div className="form-group">
        <button className="form-btn btn-secondary" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </form>
  );
};
