import react, { useState, useEffect } from "react";
import "../stylesheet/ubadashboard.css";
import UsersNames from "./ubaUsersNames";
import SideTab from "./sideTab";
import MainNav from "./mainNav";
import InnerNav from "./innerNav";
import EventsLineChart from "../charts/eventslinechart";
import UserEventsPieChart from "../charts/eventsPieChart";
import EventsBarChart from "../charts/eventsBarChart";
import UbaTable from "../charts/ubatable";
import pattern from "../assets/pattern.png";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faSquare } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownToLine } from "@fortawesome/free-solid-svg-icons";
import i3 from "../assets/i3.jpg";
import hesham from "../assets/hesham.JPG";
import { useLocation,Navigate } from "react-router-dom";
import Plot from 'react-plotly.js'

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
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import AnomalyList from "./anomalylist";
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
  faUser,
  faExclamation
);

const UbaAnomalyTrend = () => {
  const [name, setName] = useState("Hesham");

  const location = useLocation();
  const userData = location.state?.userData;
  const countGraph = JSON.parse(userData.count.name)

  //console.log("Anomaly: ", countGraph);

  const [isLogged, setIsLogged] = useState(true);
    
    
    const setLogin = () => {
      const tok = localStorage.getItem("token");
      if (tok === null) {
        setIsLogged(false);
      }
    }
  
    useEffect(() => {
      setLogin()  
    }, []);

    if (isLogged === false) {
      return <Navigate to="/" />;
    }

  return (
    <div className="container-fluid p-0 ubaContainer0">
      {/* sideTab */}
      <SideTab />

      <div className="container-fluid p-1 ubaContainer1">
        {/* Top */}
        <div className="container-fluid d-flex text-light justify-content-between ">
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

            <div className="col-md-10 px-1 column2detail">
              <div className="container-fluid mt-1 p-2 ubaContainer3">
                {/* User events navbar */}
                <InnerNav data={userData} />

                <div className="container-fluid">
                  <div className="row">
                    {/* barchart */}
                    <div className="col-md-7 text-light ">
                      <div className="container-fluid barchartcontainer">
                        <h5 className="text-light mb-0 mt-3 fw-normal pt-1">
                          Anomaly Based on Category
                        </h5>
                        <EventsBarChart
                          data={userData["count"].taskCategoryOverall}
                        />
                      </div>
                    </div>

                    {/* Recent Anomalies List */}
                    <AnomalyList data={userData.pattern} />
                  </div>
                </div>

                {/* Model Graph and piechart */}

                <div className="container-fluid">
                  <div className="row">
                    {/* Piechart */}
                    <div className="col-md-4 ps-4 ">
                      <div className="container-fluid piechartcontainer">
                        <h5 className="text-light mb-0 mt-3 fw-normal pt-1">
                          Anomaly Based on Count
                        </h5>
                        <UserEventsPieChart
                          data={userData["count"].piechartCount}
                        />
                      </div>
                    </div>

                    {/* barchart */}
                    <div className="col-md-8 text-light">
                      <div className="container-fluid barchartcontainer m-0">
                        <h5 className="text-light mb-2 mt-3 fw-normal pt-1">
                          Model Predicted Count Graph 
                        </h5>
                        <div className="container-fluid">
                        {countGraph && <Plot data={countGraph.data} layout={countGraph.layout} />}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>



                {/* Event Count Graph */}
                <div className="container-fluid linechartcontainer">
                  <h5 className="text-light mb-0 mt-3 fw-normal pt-1">
                    Anomalies Trend
                  </h5>
                  <EventsLineChart data={userData["count"].eventperday} />
                </div>

                {/* Events Table */}
                <div className="container-fluid tablecontainer">
                  <h5 className="text-light mb-0 mt-3 fw-normal pt-1">
                    Anomalies Table
                  </h5>
                  <UbaTable userData={userData.pattern} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbaAnomalyTrend;
