import React from "react";
import { BookingData } from "../../utils/dataParser";
import ChartComponent from "./../Chart";
import { ApexOptions } from "apexcharts";

interface TimeSeriesChartProps {
  data: BookingData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const seriesData = data.map((entry) => ({
    x: new Date(
      Number(entry.arrival_date_year),
      new Date(`${entry.arrival_date_month} 1, 2020`).getMonth(),
      Number(entry.arrival_date_day_of_month)
    ),
    y: Number(entry.adults) + Number(entry.children) + Number(entry.babies),
  }));

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: { enabled: true },
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      background: "#f4f4f4",
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      colors: ["#000066"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 5,
        opacityTo: 9,
        stops: [0, 90, 100],
      },
    },
    title: {
      text: "Total Visitors Over Time",
      align: "center",
      style: {
        fontSize: "20px",
        color: "#000099",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "#000099" },
      },
      axisBorder: {
        show: true,
        color: "#ff0000",
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#000099" },
        formatter: (val: number) => val.toFixed(0),
      },
      title: {
        text: "Total Visitors",
        style: {
          color: "#000099",
        },
      },
    },
    grid: {
      borderColor: "#000099",
      strokeDashArray: 5,
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (val: number) => val.toFixed(0),
      },
    },
  };

  return (
    <ChartComponent
      options={options}
      series={[{ name: "Total Visitors", data: seriesData }]}
      type="line"
      height={350}
    />
  );
};

export default TimeSeriesChart;
