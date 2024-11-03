import React from "react";
import Chart from "react-apexcharts";
import { BookingData } from "../../utils/dataParser";
import { ApexOptions } from "apexcharts";

interface CountryChartProps {
  data: BookingData[];
}

const CountryChart: React.FC<CountryChartProps> = ({ data }) => {
  const countryData = data.reduce((acc, entry) => {
    acc[entry.country] = (acc[entry.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const series = [
    {
      name: "Number of Visitors",
      data: Object.values(countryData),
    },
  ];

  const categories = Object.keys(countryData);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
      background: "#f4f4f4",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toString(),
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#000099"],
      },
    },
    xaxis: {
      categories,
      position: "bottom",
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: true },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true,
        formatter: (val: number) => val.toString(),
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="text-center my-6">
      <Chart options={options} series={series} type="bar" height={350} />
      <h3 className="text-lg font-semibold text-blue-800 ">
        Number of Visitors per Country
      </h3>
    </div>
  );
};

export default CountryChart;
