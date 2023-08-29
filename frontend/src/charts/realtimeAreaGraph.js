import React, { useState } from "react";
import ApexChart from "react-apexcharts";
import "../stylesheet/apexCharts.css";

function RealTimeAreaGraph() {
  const [state, setState] = useState({
    series: [
      {
        name: "Logs",
        data: [3100, 40000, 28000, 5100, 42000, 10900, 100000],
      },
    ],

    options: {
      chart: {
        height: 350,
        type: "area",
        foreColor: "#ccc",
        toolbar: {
          autoSelected: "pan",
          show: false, // Hide the entire toolbar
        },
        zoom: {
          enabled: false, // Disable zoom
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Logs Trend",
        align: "left",
        style: {
          fontSize: "22px", // Set the desired font size
          fontWeight: "500",
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
        theme: "dark",
      },
      legend: {
        show: true,
      },
    },
  });

  return (
    <div>
      <ApexChart
        options={state.options}
        series={state.series}
        type="area"
        height={300}
        width={700}
      />
    </div>
  );
}

export default RealTimeAreaGraph;
