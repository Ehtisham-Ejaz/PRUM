import { useState,useEffect } from "react";
import "../stylesheet/ubadashboard.css";
import UsersNames from "./ubaUsersNames";
import SideTab from "./sideTab";
import MainNav from "./mainNav";
import InnerNav from "./innerNav";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faSquare } from "@fortawesome/free-solid-svg-icons";
import hesham from "../assets/hesham.JPG";
import { useLocation,Navigate } from "react-router-dom";
import Practice from "./practice.component";
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

const UbaUserPattern = () => {
  const [name, setName] = useState("Hesham");

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

    const location = useLocation();
    const userData = location.state?.userData;
    //console.log("Data on new screen:", userData.normal_user_pattern);
  

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

                {/* Event Count Graph */}
                <div className="container-fluid text-center mt-2">
                  <h5 className="text-light mb-0 mt-3 fw-normal pt-1">Normal Pattern</h5>
                  <Practice data_dic = {userData.normal_user_pattern} />
                  <h5 className="text-light mb-0 mt-3 fw-normal pt-1">Anomaly Pattern</h5>
                  <Practice data_dic = {userData.anomolous_user_pattern} />
                </div>

                {/* Events Table */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbaUserPattern;
