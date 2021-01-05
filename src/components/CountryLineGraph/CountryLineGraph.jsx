import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./CounrtyLineGraph.css";
import axios from "axios";

// date and number config
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function CountryLineGraph({ caseType, country }) {
  const [countryDataDateWise, setCountryData] = useState();
  const [countryOverAll, setCountryOverAll] = useState();
  const [perCountryData, setPerCountry] = useState();
  const [inVal, setInVal] = useState(false);

  // fetching data of a country
  useEffect(() => {
    const fetchCountryData = async (country) => {
      if (country !== "World Wide") {
        try {
          const api_url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`;
          const response = await axios.get(api_url);
          const data = response?.data?.timeline;
          setPerCountry(data);
        } catch (e) {
          console.log(`Your error, ${country} >>>>>`, e);
        }
      }
    };
    fetchCountryData(country);
  }, [country]);

  // getting data date wise
  const ChangeData = (data) => {
    const newData = [];
    let lastPoint;
    let removigFirstData = 0;
    for (let key in data) {
      if (removigFirstData === 0) {
        lastPoint = key;
        removigFirstData++;
        continue;
      } else {
        let yValue = data[key] - data[lastPoint];
        let x = {
          x: key,
          y: yValue < 0 ? yValue * -1 : yValue,
        };
        newData.push(x);
        lastPoint = key;
      }
    }
    return newData;
  };

  // changing overall data
  const changeOverall = (data) => {
    const newDataChanges = [];
    for (let date in data) {
      let dataPoint = {
        x: date,
        y: data[date],
      };
      newDataChanges.push(dataPoint);
    }
    return newDataChanges;
  };

  useEffect(() => {
    setCountryData(ChangeData(perCountryData?.[caseType]));
    setCountryOverAll(changeOverall(perCountryData?.[caseType]));
  }, [country, caseType]);

  const colorSelector = (dataset, casetype = "cases") => {
    if (casetype === "cases") {
      return {
        datasets: [
          {
            backgroundColor: "rgba(204, 16, 52, 0.5)",
            borderColor: "#CC1034",
            data: dataset,
          },
        ],
      };
    } else if (casetype === "recovered") {
      return {
        datasets: [
          {
            backgroundColor: "rgba(25,135,84,  0.5)",
            borderColor: "#198754",
            data: dataset,
          },
        ],
      };
    } else {
      return {
        datasets: [
          {
            backgroundColor: "rgba(109,109,113, 0.5)",
            borderColor: "#6d6d71",
            data: dataset,
          },
        ],
      };
    }
  };
  const selectingOverallDataViaCases = (dataset, casetype = "cases") => {
    if (casetype === "cases") {
      return {
        datasets: [
          {
            backgroundColor: "rgba(204, 16, 52, 0.5)",
            borderColor: "#CC1034",
            data: dataset,
          },
        ],
      };
    } else if (casetype === "recovered") {
      return {
        datasets: [
          {
            backgroundColor: "rgba(25,135,84,  0.5)",
            borderColor: "#198754",
            data: dataset,
          },
        ],
      };
    } else {
      return {
        datasets: [
          {
            backgroundColor: "rgba(109,109,113, 0.5)",
            borderColor: "#6d6d71",
            data: dataset,
          },
        ],
      };
    }
  };
  const changes = (e) => {
    setInVal(e?.target?.checked);
  };
  return (
    <div className="linegraph">
      <div class="form-check form-switch toggle__switch">
        <p>Daily cases</p>
        <input
          onChange={changes}
          class="form-check-input switch"
          type="checkbox"
          id="flexSwitchCheckDefault"
        />
        <p>Overall</p>
      </div>
      <div className="graph__bottom">
        {inVal ? (
          <>
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                marginTop: "0rem",
              }}
            >
              Overall {caseType}
            </p>
            <div className="graph">
              <Line
                options={options}
                height={270}
                width={450}
                data={colorSelector(countryOverAll, caseType)}
              />
            </div>
          </>
        ) : (
          <>
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                marginTop: "0rem",
              }}
            >
              Daily {caseType}
            </p>
            <div className="graph">
              <Line
                options={options}
                height={270}
                width={450}
                data={selectingOverallDataViaCases(
                  countryDataDateWise,
                  caseType
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CountryLineGraph;
