import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";

const EventsBarChart = ({ data }) => {
  const taskCategories = data.category.map((category, index) => ({
    category: category,
    count: data.total[index],
  }));

  return (
    <div style={{ width: "90%", margin: 10, paddingLeft: "3%", }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={40} // Adjust the padding between bars
        height={160} // Adjust the height as needed
        padding={{ top: 20, bottom: 30, left: 30 }}
      >
        <VictoryAxis
          tickFormat={(tick) => tick}
          style={{
            axis: { stroke: "#ccc" },
            grid: { stroke: "none" },
            ticks: { stroke: "none" },
            tickLabels: { fontSize: 7, fill: "#666", angle: -20 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick}
          style={{
            axis: { stroke: "#ccc" },
            grid: { stroke: "none" },
            ticks: { stroke: "none" },
            tickLabels: { fontSize: 8, fill: "#666" },
          }}
        />
        <VictoryBar
          data={taskCategories}
          x="category"
          y="count"
          style={{
            data: {
              fill: "#7CB9E8", // Change the bar color
              stroke: "#333", // Change the bar border color
              strokeWidth: 1, // Adjust the bar border width
            },
            labels: {
              fontSize: 8,
              fill: "#333", // Change the label color
              padding: 4, // Adjust the label padding
            },
          }}
          alignment="start" // Align bars to the left of the x-axis ticks
        />
      </VictoryChart>
    </div>
  );
};

export default EventsBarChart;
