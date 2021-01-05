import { useEffect, useState } from "react";
import "./App.css";
// fetch library
import axios from "axios";
// Components
import Card from "./components/Cards/Card";
import Table from "./components/Table/Table";
import LineGraph from "./components/LineGraph/LineGraph";
import CountryLineGraph from "./components/CountryLineGraph/CountryLineGraph";
import Map from "./components/Map/Map";
// Icon
import CovidIcon from "./components/images/virus.svg";
import { Link } from "react-router-dom";
// React Context Api
// abc
import { useStateValue } from "./StateProvider";
import "leaflet/dist/leaflet.css";
function App() {
  // dark Mode
  const [{ darkMode }, dispatch] = useStateValue();
  // true --> dark false --> light
  const [darkTheme, setTheme] = useState(false);
  useEffect(() => {
    dispatch({
      type: "SET__DARKMODE",
      darkMode: darkTheme,
    });
  }, [darkTheme]);
  const [countries, setCountries] = useState([]);
  const [worldWide, setWorldWide] = useState([]);
  const [country, setCountry] = useState("World Wide");
  const [caseType, setType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  useEffect(() => {
    const fetchWorldWideData = async () => {
      try {
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/all?yesterday=true"
        );
        setWorldWide(response?.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchWorldWideData();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases"
        );
        const countries = response?.data.map((country) => {
          return {
            countryName: country?.country,
            countryInfo: country?.countryInfo?.iso2,
            totalCases: country?.cases,
            totalDeaths: country?.deaths,
            totalRecovered: country?.recovered,
            todayCases: country?.todayCases,
            todayDeaths: country?.todayDeaths,
            todayRecovered: country?.todayRecovered,
            lat: country?.countryInfo?.lat,
            long: country?.countryInfo?.long,
            flag: country?.countryInfo?.flag,
          };
        });
        console.log("countries >>>>", countries);
        setCountries(countries);
        setMapCenter([countries?.lat, countries?.long]);
        console.log(mapCenter);
        setMapZoom(1);
      } catch (e) {
        console.log("Error is >>>>>", e);
      }
    };
    fetchdata();
  }, []);

  const seletCountry = (e) => {
    setCountry(e.target.getAttribute("value"));
  };

  return (
    <div
      className={`container-fluid App ${darkTheme ? "darkmodeclass" : null}`}
    >
      <div className="app__left ">
        {/* header */}
        <div className="app__header">
          <div className="header__left">
            <img
              onClick={() => setTheme(!darkTheme)}
              className={darkMode ? "darkmode__img" : null}
              src={CovidIcon}
            />
            <h1>Covid19 Tracker</h1>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle "
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {country}
            </button>
            <ul class="dropdown-menu list" aria-labelledby="dropdownMenuButton">
              <li onClick={seletCountry} value="World Wide">
                World Wide
              </li>
              {countries.map((country, index) => (
                <li
                  key={index.toString()}
                  onClick={seletCountry}
                  value={country?.countryName}
                >
                  {country?.countryName}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="app__cards">
          {/* Total cases */}
          {country === "World Wide" ? (
            <>
              <div className="cardclass">
                <Card
                  key="1"
                  onClick={(e) => setType("cases")}
                  title="World Wide"
                  header="Cases"
                  newCases={worldWide?.todayCases}
                  total={worldWide?.cases}
                  color="danger"
                />
              </div>
              <div className="cardclass">
                <Card
                  key="2"
                  onClick={(e) => setType("recovered")}
                  title="World Wide"
                  header="Recovered"
                  newCases={worldWide?.todayRecovered}
                  total={worldWide?.recovered}
                  color="success"
                />
              </div>
              <div className="cardclass">
                <Card
                  key="3"
                  onClick={(e) => setType("deaths")}
                  title="World Wide"
                  header="Death"
                  newCases={worldWide?.todayDeaths}
                  total={worldWide?.deaths}
                  color="dark"
                />
              </div>
            </>
          ) : (
            countries.map((individualData) => {
              if (individualData?.countryName === country) {
                return (
                  <>
                    <div className="cardclass">
                      <Card
                        key="4"
                        onClick={(e) => setType("cases")}
                        title={individualData?.countryName}
                        header="Cases"
                        newCases={individualData?.todayCases}
                        total={individualData?.totalCases}
                        color="danger"
                      />
                    </div>
                    <div className="cardclass">
                      <Card
                        key="5"
                        onClick={(e) => setType("recovered")}
                        title={individualData?.countryName}
                        header="Recovered"
                        newCases={individualData?.todayRecovered}
                        total={individualData?.totalRecovered}
                        color="success"
                      />
                    </div>
                    <div className="cardclass">
                      <Card
                        key="6"
                        onClick={(e) => setType("deaths")}
                        title={individualData?.countryName}
                        header="Death"
                        newCases={individualData?.todayDeaths}
                        total={individualData?.totalDeaths}
                        color="dark"
                      />
                    </div>
                  </>
                );
              }
            })
          )}
        </div>
        {/* Link for doc and more info */}
        <div
          className={`info__on__virus ${darkTheme ? "darkmodelinks" : null}`}
        >
          <span className="pointer"></span>
          <Link to="/Doc">
            <h3>Documentary on Covid19</h3>
          </Link>
          <span className="pointer"></span>
          <Link to="/info">
            <h3>More info on Covid19</h3>
          </Link>
        </div>
        {/* Map */}
        <div class="mapclass">
          <Map
            countries={countries}
            caseType={caseType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>
      {/* Right Container */}
      <div className="app__right">
        <Table countries={countries} />
        {country === "World Wide" ? (
          <LineGraph caseType={caseType} country={country} />
        ) : (
          <CountryLineGraph caseType={caseType} country={country} />
        )}
      </div>
    </div>
  );
}

export default App;
