import { useEffect, useState } from "react";
import "./Form.css";
import { getUserById } from "../../services/userService";

export const EditProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});

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

  return (
    <form>
      <h2 className="page-header">Edit Profile</h2>
      <fieldset>
        <div className="form-group"></div>
        <label>Name</label>
        <input
          type="text"
          name="fullName"
          value={user.fullName ? user.fullName : ""}
          className="form-control"
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <div className="form-group"></div>
        <label>Dog's Name</label>
        <input
          type="text"
          name="dogName"
          value={user.dogName ? user.dogName : ""}
          className="form-control"
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <div className="form-group"></div>
        <label>Dog's Breed</label>
        <input
          type="text"
          name="dogBreed"
          value={user.dogBreed ? user.dogBreed : ""}
          className="form-control"
          onChange={handleInputChange}
        />
      </fieldset>
      <fieldset>
        <div className="form-group"></div>
        <label>Dog's Picture</label>
        <input
          type="text"
          name="dogUrl"
          value={user.dogUrl ? user.dogUrl : ""}
          className="form-control"
          onChange={handleInputChange}
        />
      </fieldset>
    </form>
  );
};
