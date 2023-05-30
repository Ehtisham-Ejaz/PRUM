import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const AnomalyList = ({ data }) => {
  const parseDate = (dateString) => {
    const [month, day, year, time] = dateString.split(/[\/\s:]/);
    const utcDate = new Date(Date.UTC(year, month - 1, day, time));
    
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    };
    
    return utcDate.toLocaleString("en-US", options);
  };

  // Sort the data by timestamp in descending order
  const sortedData = [...data].sort(
    (a, b) => new Date(parseDate(b.timestamp)) - new Date(parseDate(a.timestamp))
  );

  // Take the top 5 most recent items
  const recentItems = sortedData.slice(0, 5);

  return (
    <div className="col-md-5 ps-0">
      <div className="container-fluid mt-3 recentanomalycontainer">
        <h5 className="text-light mb-0 mt-3 fw-normal pt-1">
          Most Recent Anomalies
        </h5>

        {recentItems.map((item, index) => (
          <div
            className="container-fluid my-1 recentanomalycontainer2"
            key={index}
          >
            <div className="row">
              <div className="col-2 text-center d-flex align-items-center">
                <a href="/test">
                  <FontAwesomeIcon
                    className="icons"
                    icon={faExclamation}
                    size="2x"
                  />
                </a>
              </div>
              <div className="col-5 text-center d-flex align-items-center">
                <h5 className="text-light fw-semibold fs-6 ">
                  {item.taskCategory}
                </h5>
              </div>
              <div className="col-4 text-info">
                <h6 className="text-light fw-light fs-7">
                  {parseDate(item.timestamp)}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnomalyList;
