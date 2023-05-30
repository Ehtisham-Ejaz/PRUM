import React from "react";
import { VictoryPie } from "victory";

const UserEventsPieChart = ({ data }) => {
  // Create an array of objects containing category and total
  var taskCategories = []
  var top5Categories = {}
  var setX = 'time'
  var setY = 'count'
  
  if(data.category){
      taskCategories = data.category.map((category, index) => ({
      category: category,
      total: data.total[index],
    }));
      // Sort the taskCategories array based on total in descending order
  taskCategories.sort((a, b) => b.total - a.total);
  // Take only the top 5 elements
  top5Categories = taskCategories.slice(0, 5);
  console.log('here innn',top5Categories)
  setX = 'category'
  setY = 'total'

  }
  else if(data.time.length < 1){
    top5Categories = [{time:'No Anomaly',count:1}]
    console.log('here',top5Categories)
  }
  else{
    top5Categories = data.time.map((time, index) => ({
      time: time,
      count: data.total[index],
    }));
  }

  return (
    <div style={{ width: "100%", maxWidth: "300px" }}>
      <VictoryPie
        data={top5Categories}
        x={setX}
        y={setY}
        colorScale={["#7CB9E8", "#5072A7", "#002D62", "#008E97", "#03A9F4"]} // Customize the color scale
        innerRadius={100} // Adjust the size of the inner radius for a donut chart effect
        labelRadius={110} // Adjust the distance of labels from the center
        style={{
          labels: {
            fontSize: 8,
            fill: "#fff",
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};

export default UserEventsPieChart;
