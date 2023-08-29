import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function RealTimeDonut() {
  const logData = [
    { category: "Logon", value: 44 },
    { category: "Privacy Change", value: 55 },
    { category: "Object Access", value: 41 },
    { category: "Priviledge Use", value: 17 },
    { category: "System", value: 15 },
  ];

  const [state, setState] = useState({
    series: logData.map((item) => item.value),
    options: {
      chart: {
        width: 300,
        type: "donut",
        foreColor: "#ccc",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          donut: {
            size: "60%",
          },
          // expandOnClick: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        // gradient: {
        //   shade: "light",
        //   type: "horizontal",
        //   shadeIntensity: 0.25,
        //   gradientToColors: [
        //     "#0058FF",
        //     "#9AA5B1",
        //     "#4E586E",
        //     "#A0AAB2",
        //     "#7080A0",
        //   ],
        //   inverseColors: true,
        //   opacityFrom: 1,
        //   opacityTo: 1,
        //   stops: [0, 50, 100],
        // },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#255aee",
          shadeTo: "dark",
          shadeIntensity: 0.65,
        },
      },
      // legend: {
      //   formatter: function (val, opts) {
      //     return logData[opts.seriesIndex].category + " - " + val;
      //   },
      // },
      title: {
        text: "All Events Categories",
        style: {
          fontSize: "22px",
          fontWeight: "500",
        },
      },
      labels: logData.map((item) => item.category), // Use category names as labels
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="container-fluid d-flex justify-content-center">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        width={450}
        // height={400}
      />
    </div>
  );
}

export default RealTimeDonut;
