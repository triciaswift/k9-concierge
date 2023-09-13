import { useEffect, useState } from "react";
import "./Categories.css";
import { getAllCategories } from "../../services/categoryService";
import logoPic from "../../assets/logo-white.png";
import { Link } from "react-router-dom";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

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
              <Link to={`/${category.id}/${category.name}`}>
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="category-img"
                />
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
};
