import { useEffect, useState } from "react";
import "./Categories.css";
import { getAllCategories } from "../../services/categoryService";
import sloganPic from "../../assets/slogan.png";
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
        <img src={sloganPic} alt="K9-Concierge-Slogan" className="logo-img" />
      </header>
      <section className="categories-container">
        <div className="category-items">
          {categories.map((category) => {
            return (
              <div
                className="category-card"
                key={category.id}
                onClick={() => {
                  navigate(`/category/${category.id}`);
                }}
              >
                <h2 className="category-name">{category.name}</h2>
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="category-img"
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
