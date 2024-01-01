import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (e) => {
    setSelectedState("");
    setCities([]);
    setSelectedCity("");
    setSelectedCountry(e.target.value);
  };
  const handleStateChange = (e) => {
    setSelectedCity("");
    setSelectedState(e.target.value);
  };
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      let data = await response.json();
      data =new Set(data);
      data = Array.from(data);
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStates = async () => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCities = async () => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    if (selectedCountry) fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) fetchCities();
  }, [selectedState, selectedCountry]);
  return (
    <>
      <select
        name="countries"
        id=""
        value={selectedCountry}
        onChange={handleCountryChange}
        disabled={!countries.length && true}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        name="states"
        id=""
        value={selectedState}
        onChange={handleStateChange}
        disabled={!states.length && true}
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((state) => (
          <option value={state} key={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        name="cities"
        id=""
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!cities.length && true}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((city) => (
          <option value={city} key={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && selectedState && selectedCountry && <div>You selected {selectedCity}, {selectedState}, {selectedCountry}</div>}
    </>
  );
}

export default App;