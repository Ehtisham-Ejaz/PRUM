import React from "react";

import "../stylesheet/ubadashboard.css";
import Button from "./navbutton";
import cytomate from "../assets/cytomate.png";
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

const MainNav = () => {
  return (
    <div className="container-fluid p-0 mainNavbar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ">
              <li class="nav-item ms-1">
                <Button text="Home" to="/uba" />
              </li>
              <li class="nav-item ms-1">
                <Button text="Reports" to="/test" />
              </li>
              <li class="nav-item ms-1">
                <Button text="Alerts" to="/test" />
              </li>
              <li class="nav-item ms-1">
                <Button text="Settings" to="/test" />
              </li>

              {/* <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dropdown link
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNav;
