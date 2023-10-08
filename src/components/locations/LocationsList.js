import { useEffect, useState } from "react";
import "./Locations.css";
import { getAllCities } from "../../services/cityService";
import { getLocationByCategoryId } from "../../services/locationService";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById } from "../../services/categoryService";
import { CityFilterBar } from "./CityFilterBar";
import { FaStar } from "react-icons/fa";

export const LocationsList = () => {
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityChoice, setCityChoice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationsAlphabetically, setLocationsAlphabetically] = useState([]);

  const { categoryId } = useParams(); // this is a string

  const navigate = useNavigate();

  useEffect(() => {
    getLocationByCategoryId(categoryId).then((locationsArr) => {
      setLocations(locationsArr);
    });

    getCategoryById(categoryId).then((catObj) => {
      setCategory(catObj);
    });
  }, [categoryId]);

  useEffect(() => {
    getAllCities().then((cityArr) => {
      setCities(cityArr);
    });
  }, []);

  useEffect(() => {
    if (cityChoice !== 0) {
      const cityLocations = locations.filter(
        (location) => location.cityId === cityChoice
      );
      setFilteredLocations(cityLocations);
    } else {
      setFilteredLocations(locations);
    }
  }, [cityChoice, locations]);

  useEffect(() => {
    const foundLocations = locations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(foundLocations);
  }, [searchTerm, locations]);

  useEffect(() => {
    let sortedLocations = filteredLocations.sort((c1, c2) =>
      c1.name > c2.name ? 1 : c1.name < c2.name ? -1 : 0
    );
    setLocationsAlphabetically(sortedLocations);
  }, [filteredLocations]);

  const handleRatingAverage = (location) => {
    let sum = 0;
    let average = 0;
    for (let i = 0; i < location.reviews.length; i++) {
      sum += location.reviews[i].rating;
    }
    average = Math.round(sum / location.reviews?.length);

    return average;
  };

  return (
    <>
      <div className="category-header-container">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="category-img-two"
        />
        <h2 className="page-header">{category.name}</h2>
        <img
          src={category.imageUrl}
          alt={category.name}
          className="category-img-two"
        />
      </div>
      <div className="locations-container">
        <CityFilterBar
          cities={cities}
          setCityChoice={setCityChoice}
          setSearchTerm={setSearchTerm}
        />
        <section className="locations">
          {locationsAlphabetically.map((locationObj) => {
            return (
              <div
                className="location-card"
                key={locationObj.id}
                onClick={() => {
                  navigate(`/location/${locationObj.id}`);
                }}
              >
                <div className="location-name">{locationObj.name}</div>

                <div className="location-rating">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <div key={index}>
                        <FaStar
                          className="star-1"
                          size={35}
                          color={
                            currentRating <= handleRatingAverage(locationObj)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};
