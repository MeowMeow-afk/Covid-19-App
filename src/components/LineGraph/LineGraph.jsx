import React, { useEffect, useState } from "react";
import "./LineGraph.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { useStateValue } from "../../StateProvider";

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

function LineGraph({ caseType = "cases" }) {
  const [{ darkMode }, dispatch] = useStateValue();
  // state for worldWide data 🐅
  const [myData, setMyData] = useState();
  const [overall, setOverall] = useState();
  // state for switching between daily and overall 🍅
  const [inVal, setInVal] = useState(false);

  // changing data date wise 🐰
  const ChangeData = (data, caseType = "cases") => {
    const newData = [];
    let lastPoint;
    const setdata = data[caseType];
    let removigFirstData = 0;
    for (let key in setdata) {
      if (removigFirstData === 0) {
        lastPoint = key;
        removigFirstData++;
        continue;
      } else {
        let yValue = setdata[key] - setdata[lastPoint];
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

  // changing overall data 🐇
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

  // obj -> response >>> obj -> data >>> obj -> cases , obj -> deaths, obj -> recovered
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        const historicalData = response?.data;
        //overall data
        const overallData = changeOverall(historicalData[caseType]);
        setOverall(overallData);
        // converting date wise
        const selectedHistoricalData = ChangeData(historicalData, caseType);
        setMyData(selectedHistoricalData);
      } catch (e) {
        console.log("Your error >>>>>", e);
      }
    };
    fetchdata();
  }, [caseType]);

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
  // console.log(inVal);
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
      {console.log(overall)}
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
                data={selectingOverallDataViaCases(overall, caseType)}
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
                data={colorSelector(myData, caseType)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LineGraph;
