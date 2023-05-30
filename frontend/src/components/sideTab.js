import React from "react";
import "../stylesheet/ubadashboard.css";
import { Link } from 'react-router-dom';
import logo from "../assets/CA_LOGO.png";
import pattern from "../assets/pattern.png";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownToLine } from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartBar,
  faKey,
  faBars,
  faUsers,
  faLocationCrosshairs,
  faFileImport,
  faSearch,
  faCircleExclamation,
  faSignOut,
  faHouse,
  faMagnet,
  faBug,
  faBolt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faChartBar,
  faKey,
  faBars,
  faUsers,
  faLocationCrosshairs,
  faFileImport,
  faSearch,
  faCircleExclamation,
  faSignOut,
  faHouse,
  faMagnet,
  faBug,
  faBolt,
  faUser
);

const SideTab = () => {
  const handleClick = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="container-fluid ubaSideTab">
      <img className="logoimage " src={logo} alt="logohere"></img>
      <div className="container-fluid sidaTabicons">
        <a >
          <FontAwesomeIcon className="icons" icon={faHouse} size="2x" />
        </a>
        <a >
          <FontAwesomeIcon className="icons" icon={faUsers} size="2x" />
        </a>
        <a href="/uba">
          <FontAwesomeIcon className="icons" icon={faMagnet} size="2x" />
        </a>
        <Link>
          <FontAwesomeIcon
            className="icons"
            icon={faLocationCrosshairs}
            size="2x"
          />
        </Link>
        <a href="/file">
          <FontAwesomeIcon className="icons" icon={faFileImport} size="2x" />
        </a>
        <Link to="/" onClick={() => localStorage.removeItem("token")}>
          <FontAwesomeIcon
            className="icons"
            icon={faSignOut}
            size="2x"
          />
        </Link>
      </div>
    </div>
  );
};

export default SideTab;
