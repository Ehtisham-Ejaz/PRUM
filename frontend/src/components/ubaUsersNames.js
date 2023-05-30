import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheet/ubadashboard.css";
import axios from "axios";

const UsersNames = () => {
  const [data, setData] = useState([]);
  const getUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/getuser");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();

  const routehandle = async (username) => {
    try {
      console.log("Username is: ", username);
      const response = await axios.get("http://localhost:5000/getdata", {
        params: { username },
      });

      if (response.status === 200) {
       
        const data1 = response.data[username];

        // Navigate to the '/userevents' screen and pass the data as props
        navigate("/userevents", { state: { userData: data1 } });
      } else {
       console.log('Fail'); // navigate to next page
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUserClick = (e, userId, userName) => {
    e.preventDefault();
    setActiveUser(userId);
    routehandle(userName);
  };

  return (
    <div className="container-fluid ms-0 mt-1 mb-3 ubaUserNamesContainer1">
      <ul className="ubaUserNamesContainer2 p-0 m-0">
        {data.map((item) => (
          <Link
            to={`/userevents`}
            key={item.id}
            className={`linkStyle ${
              activeUser === item.id ? "active-link" : ""
            }`}
            onClick={(e) => handleUserClick(e, item.id, item.text)}
          >
            <li className="ubaUserNamesContainer3 text-light mx-1 my-3">
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UsersNames;
