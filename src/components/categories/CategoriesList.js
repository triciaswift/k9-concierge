import { useEffect, useState } from "react";
import "./Categories.css";
import { getAllCategories } from "../../services/categoryService";
import logoPic from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  }, []);

  return (
    <>
      <header>
        <img src={logoPic} alt="K9-Concierge-Logo" className="logo-img" />
        <h1 className="header categories-header">K9 Concierge</h1>
        <img src={logoPic} alt="K9-Concierge-Logo" className="logo-img" />
      </header>
      <section className="categories-container">
        {categories.map((category) => {
          return (
            <div className="category-card" key={category.id}>
              <h2 className="category-name">{category.name}</h2>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="category-img"
                onClick={() => {
                  navigate(`/category/${category.id}`);
                }}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};
