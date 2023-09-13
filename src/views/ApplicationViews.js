import { Outlet, Route, Routes } from "react-router-dom";
import { CategoriesList } from "../components/categories/CategoriesList";
import { NavBar } from "../components/navbar/NavBar";
import { PlacesList } from "../components/places/PlacesList";

export const ApplicationViews = () => {
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
        <Route path="/:category/details" element="Hello" />
      </Route>
    </Routes>
  );
};
