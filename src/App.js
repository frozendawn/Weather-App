import styles from "./App.module.css";
import { useEffect, useState, useRef } from "react";
import CurrentWeather from "./Components/CurrentWeather";
import Spinner from "./Components/Spinner";
import imgClear from "./img/clear.jpg";
import imgClouds from "./img/clouds.jpg";
import imgRain from "./img/rain.jpg";
import imgSnow from "./img/snow.jpg";

function App() {
  const [city, setCity] = useState({
    name: "New York",
    weather: "Clouds",
    description: "Cloudy",
    degrees: `10°`,
  });


  const [isLoading, setIsLoading] = useState(true);
  const cityInputRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&APPID=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
      );
      setIsLoading(false);
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log("logging data", data);

        const convertedData = {
          name: data.name,
          weather: data.weather[0].main,
          description: data.weather[0].description,
          degrees: `${Math.floor(data.main.temp)}°`,
        };
        setCity(convertedData);
      } else {
        console.log("City not Found!");
      }
    };

    const timeout = setTimeout(fetchData, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(timeout);
    };
  }, [city.name]);

  const changeCityHandler = () => {
    setCity((prevState) => {
      return {
        ...prevState,
        name: cityInputRef.current.value,
      };
    });
  };

  let appBackground = {};

  switch (city.weather) {
    case "Clouds":
      appBackground = {
        backgroundImage: `url(${imgClouds})`,
      };
      break;
    case "Clear":
      appBackground = {
        backgroundImage: `url(${imgClear})`,
      };
      break;
    case "Rain":
      appBackground = {
        backgroundImage: `url(${imgRain})`,
      };
      break;
    case "Snow":
      appBackground = {
        backgroundImage: `url(${imgSnow})`,
      };
      break;

    default:
      appBackground = {
        backgroundImage: `url(${imgClear})`,
      };
  }


  return (
    <div className={styles.App}>
      <div style={appBackground} className={styles.Container}>
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="City..."
            ref={cityInputRef}
            value={city.name}
            onChange={changeCityHandler}
          ></input>
        </div>
        {isLoading ? <Spinner /> : <CurrentWeather city={city} />}
      </div>
    </div>
  );
}

export default App;
