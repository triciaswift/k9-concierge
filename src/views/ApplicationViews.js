import { Outlet, Route, Routes } from "react-router-dom";
import { CategoriesList } from "../components/categories/CategoriesList";
import { NavBar } from "../components/navbar/NavBar";
import { PlacesList } from "../components/places/PlacesList";
import { PlaceDetails } from "../components/places/PlaceDetails";
import { useEffect, useState } from "react";

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
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<CategoriesList />} />
        <Route path=":categoryId/:categoryName" element={<PlacesList />} />
        <Route
          path="/:placeId/details"
          element={<PlaceDetails currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
