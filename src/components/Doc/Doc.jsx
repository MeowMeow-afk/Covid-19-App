import React, { useState } from "react";
import Covid19Doc from "../video/Covid19Doc.mp4";
import ReactPlayer from "react-player";
import { Link, useHistory } from "react-router-dom";
import Virus from "../images/virus.svg";
import "./Doc.css";
function Doc() {
  const [fade, setFade] = useState(false);
  const history = useHistory();
  const pushback = () => {
    history.push("/");
  };
  return (
    <div className="player">
      <div id="bg"></div>
      <div className="media">
        <h2>Documentary</h2>
        <ReactPlayer
          className="mediaplayer"
          onEnded={pushback}
          controls
          url={Covid19Doc}
        />
      </div>
      <div className="logo__info">
        <img className="player__image" src={Virus} />
        <p>
          Coronavirus disease 2019 (COVID-19) is a contagious disease caused by
          severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2).
        </p>
        <button onClick={pushback} className="btnbtn">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Doc;
