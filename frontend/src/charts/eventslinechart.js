import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
} from "victory";

const EventsLineChart = ({ data }) => {
  const formattedData = data.date.map((date, index) => ({
    date: new Date(date),
    events: data.total[index],
  }));

  return (
    <div style={{ width: "100%", maxWidth: "90%", margin: 0, padding: 0 }}>
      {/* Adjust the width and maxWidth as needed */}
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 1000 }}
        height={100} // Adjust the height as needed
        padding={{ top: 20, bottom: 20, left: 30, right: 2 }}
        domainPadding={{ x: [10, 10] }} // Reduce the padding between chart and axes
        style={{ background: { fill: "transparent" } }} // Set the chart background to transparent
      >
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick}
          style={{
            axis: { stroke: "none" }, // Remove the axis line
            grid: { stroke: "none" }, // Remove the grid lines
            ticks: { stroke: "none" },
            tickLabels: { fontSize: 6, fill: "#666" },
          }}
        />
        <VictoryAxis
          tickFormat={(x) => new Date(x).toLocaleDateString("en-US")}
          style={{
            axis: { stroke: "none" }, // Remove the axis line
            grid: { stroke: "none" }, // Remove the grid lines
            ticks: { stroke: "none" },
            tickLabels: { fontSize: 6, fill: "#666", angle: -10, padding: 3 },
          }}
        />
        <VictoryLine
          data={formattedData}
          x="date"
          y="events"
          style={{
            data: {
              stroke: "#986BF5",
              strokeWidth: 2,
              filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5))", // Add bottom shadow effect
            },
            labels: { fill: "#ff7300", fontSize: 8 },
          }}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 8, fill: "#ff7300" }}
              flyoutStyle={{ fill: "white" }}
            />
          }
          labels={({ datum }) => datum.events} // Display event count as label
          labelComponent2={<VictoryLabel dy={-10} />} // Adjust the label position
        />
      </VictoryChart>
    </div>
  );
};

export default EventsLineChart;
