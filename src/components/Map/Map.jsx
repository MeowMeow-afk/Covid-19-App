import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
function Map({ countries, caseType, center, zoom }) {
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 500,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 300,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 400,
    },
  };
  const showDataOnMap = (data, caseType = "cases") =>
    data.map((country) => (
      <Circle
        center={[country?.lat, country?.long]}
        color={casesTypeColors[caseType]?.hex}
        fillColor={casesTypeColors[caseType]?.hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country?.totalCases) * casesTypeColors[caseType]?.multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country?.flag})` }}
            ></div>
            <div className="info-name">{country?.countryName}</div>
            <div className="info-confirmed">
              Cases: {numeral(country?.totalCases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country?.totalRecovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country?.todayDeaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, caseType)}
      </MapContainer>
    </div>
  );
}

export default Map;
