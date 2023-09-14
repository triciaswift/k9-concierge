import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();

  const profile = `/profile/${currentUser.id}`;

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to={profile}>Profile</Link>
      </li>
      {localStorage.getItem("canine_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("canine_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
