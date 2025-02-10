// src/App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // State for managing the input, weather data, and error messages.
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  // Function to handle the form submission and fetch weather data.
  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setWeatherData(null);

    // Your provided API key is integrated below.
    const apiKey = "5dc4bbd1e5d52d2f462ce1e801d6a562";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("City not found. Please check the city name.");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Weather Dashboard</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Weather Data Card */}
      {weatherData && (
        <div className="card mx-auto" style={{ maxWidth: "400px" }}>
          <div className="card-body text-center">
            <h2 className="card-title">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <h3 className="card-subtitle mb-2 text-muted">
              {weatherData.weather[0].description}
            </h3>
            <p className="card-text">Temperature: {weatherData.main.temp}°C</p>
            <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
            <p className="card-text">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
