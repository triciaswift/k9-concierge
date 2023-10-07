import { Outlet, Route, Routes } from "react-router-dom";
import { CategoriesList } from "../components/categories/CategoriesList";
import { NavBar } from "../components/navbar/NavBar";
import { LocationsList } from "../components/locations/LocationsList";
import { LocationDetails } from "../components/locations/LocationDetails";
import { useEffect, useState } from "react";
import { Profile } from "../components/profile/Profile";
import { EditProfile } from "../components/forms/EditProfile";
import { EditReview } from "../components/forms/EditReview";
import { NewReview } from "../components/forms/NewReview";
import { NewLocation } from "../components/forms/NewLocation";
import { FavoriteList } from "../components/favorites/FavoriteList";

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
        <Route path="category/:categoryId" element={<LocationsList />} />
        <Route path="location/:locationId">
          <Route
            index
            element={<LocationDetails currentUser={currentUser} />}
          />
          <Route
            path="review"
            element={<NewReview currentUser={currentUser} />}
          />
        </Route>
        <Route path="profile/:userId">
          <Route index element={<Profile currentUser={currentUser} />} />
          <Route
            path="edit"
            element={<EditProfile currentUser={currentUser} />}
          />
        </Route>
        <Route path="review/:reviewId" element={<EditReview />} />
        <Route
          path="location/new"
          element={<NewLocation currentUser={currentUser} />}
        />
        <Route
          path="favorites"
          element={<FavoriteList currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
