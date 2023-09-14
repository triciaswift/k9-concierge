import { Outlet, Route, Routes } from "react-router-dom";
import { CategoriesList } from "../components/categories/CategoriesList";
import { NavBar } from "../components/navbar/NavBar";
import { PlacesList } from "../components/places/PlacesList";
import { PlaceDetails } from "../components/places/PlaceDetails";
import { useEffect, useState } from "react";
import { Profile } from "../components/profile/Profile";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCanineUser = localStorage.getItem("canine_user");
    const canineUserObj = JSON.parse(localCanineUser);

    setCurrentUser(canineUserObj);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<CategoriesList />} />
        <Route
          path="category/:categoryId/:categoryName"
          element={<PlacesList />}
        />
        <Route
          path="details/:placeId"
          element={<PlaceDetails currentUser={currentUser} />}
        />
        <Route path="profile/:userId">
          <Route index element={<Profile currentUser={currentUser} />} />
          <Route path="edit" element="Edit Profile Form" />
        </Route>
        <Route path="review/new" element="Add Review Form" />
        <Route path="review/edit/:reviewId" element="Edit Review Form" />
        <Route path="place/new" element="Add Place Form" />
      </Route>
    </Routes>
  );
};
