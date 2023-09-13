import { Outlet, Route, Routes } from "react-router-dom";
import { CategoriesList } from "../components/categories/CategoriesList";
import { NavBar } from "../components/navbar/NavBar";

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
      </Route>
    </Routes>
  );
};
