import { useState } from "react";
import axios from "axios";

function App() {
    const [value, setValue] = useState("");
    const [validate, setValidate] = useState(null);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    let key = "secret";
    function getWeather() {
        if (value !== "") {
            setValidate(null);
            setError(null);
            axios({
                method: "get",
                url:
                    "http://api.weatherapi.com/v1/current.json?key=" +
                    key +
                    "&q=" +
                    value,
            })
                .then(function (response) {
                    setWeather(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                    setError("Ошибка при запросе данных");
                });
        } else {
            setValidate("Заполните поле");
        }
    }

    return (
        <>
            <h1>Погода</h1>
            {validate && <p className="error">{validate}</p>}
            {error && <p className="error">{error}</p>}
            <label>
                <input onChange={(e) => setValue(e.target.value)} />
                <button onClick={getWeather}>Узнать погоду</button>
            </label>
            {weather && (
                <div className="weather">
                    <div className="left">
                        <p>Страна: {weather.location.country}</p>
                        <p>Регион: {weather.location.region}</p>
                        <p>Город: {weather.location.name}</p>
                    </div>
                    <div className="right">
                        <p>Температура: {weather.current.temp_c}°C</p>
                        <p>{weather.current.condition.text}</p>
                        <img
                            alt="weather"
                            src={weather.current.condition.icon.replace(
                                "//",
                                "https://"
                            )}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
