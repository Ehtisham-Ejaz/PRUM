import React, { useState, useEffect } from "react";
import "../stylesheet/ubadashboard.css";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import UsersNames from "./ubaUsersNames";
import SideTab from "./sideTab";
import MainNav from "./mainNav";
import HighlightedUser from "../charts/highlightedUserMap";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faSquare } from "@fortawesome/free-solid-svg-icons";
import hesham from "../assets/hesham.JPG";
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

const UBA = () => {
  const [name] = useState("John");
  const [arrLen, setArrlen] = useState(0);
  const [username, setUsernames] = useState(0);
  

  const [isLogged, setIsLogged] = useState(true);
    
    
    const setLogin = () => {
      const tok = localStorage.getItem("token");
      if (tok === null) {
        setIsLogged(false);
      }
    }

  const getUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/getuser");
      setArrlen(response.data.length);
      setUsernames(response.data)
      
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    setLogin()
    getUser();
  }, []);

  if (isLogged === false) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid p-0 ubaContainer0">
      {/* sideTab */}
      <SideTab />

      <div className="container-fluid p-1 ubaContainer1">
        {/* Profile */}
        <div className="container-fluid d-flex text-light justify-content-between">
          <h3>UBA</h3>
          <div className="d-flex justify-content-center">
            <span className="fa-stack fa-lg">
              <FontAwesomeIcon
                icon={faSquare}
                className="fa-stack-1x"
                style={{ color: "#62275e" }}
              />
              <FontAwesomeIcon
                icon={faArrowDown}
                className="fa-stack-1x"
                style={{ color: "white" }}
              />
            </span>
            <FontAwesomeIcon
              className="fa-1x mt-2 me-3"
              icon={faBell}
              style={{ color: "white" }}
            />
            <img
              style={{ height: "40px", width: "40px", borderRadius: "100%" }}
              className="me-3"
              src={hesham}
              alt="Profile Picture"
            ></img>
            <h5 className="mt-1" style={{ color: "white" }}>
              {name}
            </h5>
          </div>
        </div>

        {/* navbar */}
        <MainNav />

        <div className="container-fluid  ubaContainer2">
          <div className="row ">
            {/* users names list*/}
            <div className="col-md-2 p-0 d-none d-md-block column1detail">
              <UsersNames />
            </div>

            <div className="col-md-10  px-1 column2detail">
              <div className="container-fluid mt-1 p-2 ubaContainer3">
                {/* detail boxes */}

                <div className="row text-center my-1 mx-0 p-1 gap-3">
                  <div className="col-md p-1 ">
                    <div className="container-fluid py-2 d-flex align-items-center ubaContainer4">
                      <FontAwesomeIcon
                        icon={faBolt}
                        size="2x"
                        color="white"
                        className="detailIcons"
                      />
                      <div className="container-fluid text-light">
                        <h3 className="fs-3 fw-bold m-0 text-end">4500</h3>
                        <h4 className="fs-6 fw-lighter m-0  text-end">
                          Events Injested
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md p-1 ">
                    <div className="container-fluid  py-2 d-flex align-items-center ubaContainer4">
                      <FontAwesomeIcon
                        icon={faBug}
                        size="2x"
                        color="white"
                        className="detailIcons"
                      />
                      <div className="container-fluid text-light">
                        <h3 className="fs-3 fw-bold m-0 text-end">30</h3>
                        <h4 className="fs-6 fw-lighter m-0  text-end">
                          Anomalies Detected
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-md p-1">
                    <div className="container-fluid  py-2 d-flex align-items-center ubaContainer4">
                      <FontAwesomeIcon
                        icon={faUser}
                        size="2x"
                        color="white"
                        className="detailIcons"
                      />
                      <div className="container-fluid text-light">
                        <h3 className="fs-3 fw-bold m-0 text-end">{arrLen}</h3>
                        <h4 className="fs-6 fw-lighter m-0  text-end">
                          Users Monitored
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pattern  */}
                <div className="container-fluid text-center mt-2">
                  <HighlightedUser count={arrLen} users = {username} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UBA;
