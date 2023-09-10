import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheet/realtimeDashboard.css";
import SideTab from "./sideTab";
import MainNav from "./mainNav";
import RealTimeAreaGraph from "../charts/realtimeAreaGraph";
import RealTimeDonut from "../charts/realTimeDonutChart";
import RealTimeCountGraph from "../charts/realTimeLogsCountGraph";
import UbaTable from "../charts/ubatable";
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

const MITREDashboard = () => {
  const [name] = useState("Hesham");
  const [userData, setuserData] = useState();

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

  const getMitreTechniques = async () => {
    try {
      const username = "we1775srv";
      const response = await axios.get("http://localhost:5000/mitre");
      console.log("response: ", response.data);
      setuserData(response.data);
      console.log("userData: ", userData);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("useffect");
    setLogin();
    getMitreTechniques();
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
          <h3>MITRE</h3>
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
          {/* <div className="row py-3">
            
            <div className="col-md-6 realtimecount">
              <RealTimeAreaGraph />
            </div>
            <div className="col-md-6 realtimecount">
              <RealTimeDonut />
            </div>
          </div> */}

          <div className="container-fluid realtimecount my-2">
            {/* <h5 className="text-light mb-0 mt-3 fw-normal pt-3">Logs Trend</h5> */}
            <iframe
              src="http://localhost:4200" // Replace with your Navigator URL
              width="100%"
              height="800px"
              title="MITRE ATT&CK Navigator"
            />
          </div>

          {/* <div className="container-fluid realtimetable">
            <h5 className="text-light mb-0 mt-3 fw-normal pt-1">Logs</h5>
            <UbaTable userData={userData} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MITREDashboard;
