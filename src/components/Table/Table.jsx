import React from "react";
import "./Table.css";
import { useStateValue } from "../../StateProvider";
function Table({ countries }) {
  const [{ darkMode }, dispatch] = useStateValue();
  const test = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
      : Math.abs(Number(labelValue));
  };

  return (
    <div className={`tableclass ${darkMode ? "darkModeTable" : null}`}>
      <table class="table table-responsive">
        <thead className="tablehead">
          <tr className="tablerow">
            <th scope="col-7">#</th>
            <th scope="col">Country</th>
            <th scope="col">Cases</th>
            <th scope="col">Recovered</th>
            <th scope="col">Death</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr
              key={index.toString()}
              className={darkMode ? "darkmode__tabledata" : "tabledata"}
            >
              <th
                key={(index + 10).toString()}
                className={darkMode ? "darkmode__numbering" : null}
                scope="row"
              >
                {index + 1}
              </th>
              <td key={(index + 1).toString()}>{country?.countryName}</td>
              <td key={(index + 2).toString()}>{test(country?.totalCases)}</td>
              <td key={(index + 3).toString()}>
                {test(country?.totalRecovered)}
              </td>
              <td key={(index + 4).toString()}>{test(country?.totalDeaths)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
