import { useEffect, useState } from "react";

export const CityFilterBar = ({ setCityChoice, cities, setSearchTerm }) => {
  const [citiesAlphabetical, setCities] = useState([]);

  useEffect(() => {
    let sortedCities = cities.sort((c1, c2) =>
      c1.name > c2.name ? 1 : c1.name < c2.name ? -1 : 0
    );
    setCities(sortedCities);
  }, [cities]);

  return (
    <div className="filter-bar">
      <select
        className="filter-box"
        id="location-select"
        onChange={(event) => {
          setCityChoice(parseInt(event.target.value));
        }}
      >
        <option value={0}>All Cities</option>
        {citiesAlphabetical.map((city) => {
          return (
            <option value={city.id} key={city.id}>
              {city.name}
            </option>
          );
        })}
      </select>
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Locations"
        className="location-search"
      />
    </div>
  );
};
