import React from "react";
import "./Card.css";
import { useStateValue } from "../../StateProvider";
function Card({ header, title, newCases, total, color, ...props }) {
  // darkmode
  const [{ darkMode }, dispatch] = useStateValue();
  // for converting integer to word ex: 7,000,000 to 7M(7 million) 💯
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
    <div onClick={props.onClick}>
      <div
        class={`card border-${color} mb-3 bg-color ${
          darkMode ? "bg-darkmode" : null
        }`}
        style={{ maxWidth: "18rem" }}
        name="clicked here"
      >
        <div
          class={`card-header bg-transparent border-${color} ${color}__animate ${
            darkMode ? "darkmode__animate" : "animate"
          }`}
        >
          <strong>{title}</strong>
        </div>
        <div class={`card-body text-${color}`}>
          <h5
            class={`card-title ${
              color == "dark" && darkMode ? "darkmode__color__heading" : null
            }`}
          >
            <strong>{header}:</strong>
          </h5>
          <p
            class={`card-text space ${
              color == "dark" && darkMode ? "darkmode__color" : null
            }`}
          >
            {newCases ? test(newCases) + "+" : "-"}
          </p>
        </div>
        <div class={`card-footer bg-transparent border-${color}`}>
          Total :<span className="space">{total ? test(total) : "-"}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
