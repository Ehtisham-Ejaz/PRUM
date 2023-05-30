import React, { useState } from "react";
import "../stylesheet/ubadashboard.css";
import { useNavigate } from "react-router-dom";

const InnerNav = ({data}) => {

  React.useEffect(() =>{
      
  }, [])

    
    //console.log("data in innerNav: ",data)
    const [activeButton, setActiveButton] = useState(null);
    const navigate = useNavigate();

    const handleButtonClick = (e, buttonId) => {
      e.preventDefault()
      setActiveButton(buttonId);
      try {
      
        if (buttonId === 1) {
          navigate("/userevents", { state: { userData: data } });
        } else if (buttonId === 2) {
          navigate("/useranomalies", { state: { userData: data } });
        } else if (buttonId === 3) {
          navigate("/userpattern", { state: { userData: data } });
        } else {
          navigate("/userevents");
        }                                                                           

      } catch (error) {
        console.error("Error: ", error);
      }
      

    };

  return (
    <div className="container-fluid ">
      <button
        className={`navbutton ${activeButton === 1 ? "active" : ""}`}
        onClick={(e) => handleButtonClick(e, 1)}
      >
        Event Overview
      </button>
      <button
        className={`navbutton ${activeButton === 2 ? "active" : ""}`}
        onClick={(e) => handleButtonClick(e, 2)}
      >
        Anomaly Trend
      </button>
      <button
        className={`navbutton ${activeButton === 3 ? "active" : ""}`}
        onClick={(e) => handleButtonClick(e,3)}
      >
        User Pattern
      </button>
      
    </div>
  );
};

export default InnerNav;