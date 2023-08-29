import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts"; // Make sure to install the 'react-apexcharts' package
import axios from "axios";

function RealTimeCountGraph() {
  // const data = generateDayWiseTimeSeries(
  //   new Date("22 Apr 2017").getTime(),
  //   115,
  //   {
  //     min: 30,
  //     max: 90,
  //   }
  // );

  const [data, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/getdata");
        const transformedData = transformData(
          response.data["we1775srv"].count.eventperday
        );

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function transformData(data) {
    const transformed = [];

    for (let i = 0; i < data.date.length; i++) {
      transformed.push([data.date[i], data.total[i]]);
    }
    // console.log("transformed", transformed);
    transformed.sort((a, b) => a[0].localeCompare(b[0]));
    return transformed;
  }

  var options1 = {
    chart: {
      id: "chart2",
      type: "area",
      height: 230,
      foreColor: "#ccc",
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
    },
    colors: ["#00BAEC"],
    stroke: {
      width: 3,
    },
    grid: {
      borderColor: "#555",
      clipMarkers: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 5,
      colors: ["#000524"],
      strokeColor: "#00BAEC",
      strokeWidth: 3,
    },
    series: [
      {
        name: "Logs",
        data: data,
      },
    ],
    tooltip: {
      theme: "dark",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
    },
  };

  var options2 = {
    chart: {
      id: "chart1",
      height: 130,
      type: "bar",
      foreColor: "#ccc",
      brush: {
        target: "chart2",
        enabled: true,
      },
      selection: {
        enabled: true,
        fill: {
          color: "#fff",
          opacity: 0.4,
        },
        xaxis: {
          min: data.length > 0 ? data[0][0] : null, // First date in your data
          max: data.length > 0 ? data[data.length - 1][0] : null, // Last date in your data
        },
      },
    },
    colors: ["#FF0080"],
    series: [
      {
        name: "Logs",
        data: data,
      },
    ],
    stroke: {
      width: 2,
    },
    grid: {
      borderColor: "#444",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      tickAmount: 2,
    },
  };

  useEffect(() => {
    const chart1 = new ApexCharts(
      document.querySelector("#chart-area"),
      options1
    );
    chart1.render();

    const chart2 = new ApexCharts(
      document.querySelector("#chart-bar"),
      options2
    );
    chart2.render();
  }, []);

  // function generateDayWiseTimeSeries(baseval, count, yrange) {
  //   var i = 0;
  //   var series = [];
  //   while (i < count) {
  //     var x = baseval;
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

  //     series.push([x, y]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }

  // console.log("chartData:", data);
  return (
    <div id="wrapper">
      <div id="chart-area">
        <ApexCharts
          options={options1}
          series={[{ data }]}
          type="area"
          height={160}
        />
      </div>
      <div id="chart-bar">
        <ApexCharts
          options={options2}
          series={[{ data }]}
          type="bar"
          height={120}
        />
      </div>
      
    </div>
  );
}

export default RealTimeCountGraph;
