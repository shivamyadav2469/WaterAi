import React from 'react';
import Chart from 'react-apexcharts';

interface ChartProps {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  type: "line" | "bar" | "area" | "pie" | "radar" | "scatter";
  height?: number;
}

const ChartComponent: React.FC<ChartProps> = ({ options, series, type, height = 300 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Chart options={options} series={series} type={type} height={height} />
    </div>
  );
};

export default ChartComponent;
