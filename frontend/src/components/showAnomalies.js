import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheet/realtimeDashboard.css";
import SideTab from "./sideTab";
import MainNav from "./mainNav";
import DataTable from 'react-data-table-component';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faSquare } from "@fortawesome/free-solid-svg-icons";
import hesham from "../assets/hesham.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useLocation, Navigate } from "react-router-dom";
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
import { Background } from "victory";

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

const ShowAnomalieslist = () => {

    const column = [
      {
        name: "Timestamp",
        selector: (row) => row.timestamp,
        sortable: true,
      },
      {
        name: "Source",
        selector: (row) => row.source,
        sortable: true,
      },
      {
        name: "Event ID",
        selector: (row) => row.eventid,
        sortable: true,
      },
      {
        name: "Level",
        selector: (row) => row.level,
        sortable: true,
      },
      {
        name: "Task Category",
        selector: (row) => row.taskCategory,
        sortable: true,
      },
      {
        name: "Message",
        selector: (row) => row.message,
      },
    ];

    const data = [
      {
        id: 1,
        timestamp: "",
        source: "",
        eventid: '',
        level: "",
        taskCategory: "",
        message: "",
      },
    ];

  const [name] = useState("Husnain");
  const [anomalies, setAnomalies] = useState();

  const location = useLocation();
  // const userData = location.state?.userData;

  const [isLogged, setIsLogged] = useState(true);

  const setLogin = () => {
    console.log("sign in");
    const tok = localStorage.getItem("token");
    if (tok === null) {
      setIsLogged(false);
    }
  };

  const getAnomalies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lstm_testing");
      console.log("response: ", response.data);
      setAnomalies(response.data);
      console.log("Anomalies: ", anomalies);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("useffect");
    setLogin();
    getAnomalies()
    console.log("useffect");
  }, []);

  if (isLogged === false) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid p-0 realtimeContainer0">
      {/* sideTab */}
      <SideTab />

      <div className="container-fluid p-1 realtimeContainer1">
        {/* Profile */}
        <div className="container-fluid d-flex text-light justify-content-between p-0">
          <h3>Anomalies</h3>
          <div className="d-flex justify-content-center">
            {/* <span className="fa-stack fa-lg">
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
            </span> */}
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

        <div className="container-fluid ubaContainer2 ps-0">
          
          <div className="container-fluid realtimecount my-2 pb-2 bg-dark h-80">
            <h5 className="text-light mb-0 mt-3 mb-3 fw-normal pt-3">
              Detected Anomalies
            </h5>
            {anomalies ? (
              <DataTable
              columns={column}
              data={anomalies}
              selectableRows
              fixedHeader
              pagination
              theme="dark"
              
            ></DataTable>
            ): (
              <DataTable
              columns={column}
              data={data}
              selectableRows
              fixedHeader
              pagination
              theme="dark"
              
            ></DataTable>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAnomalieslist;
