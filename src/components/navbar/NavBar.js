import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logoPic from "../../assets/logo.png";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <img src={logoPic} alt="K9-Concierge-Logo" className="navbar-img" />

      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to={`/profile/${currentUser.id}`}>
          Profile
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to={`/favorites`}>
          Favorites
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/place/new">
          New Place
        </Link>
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
