// src/components/charts/CountryChart.tsx
import React from 'react';
import ChartComponent from '../Chart';
import { BookingData } from '../../utils/dataParser';

interface CountryChartProps {
  data: BookingData[];
}

const CountryChart1: React.FC<CountryChartProps> = ({ data }) => {
  // Aggregate data by country
  const countryData = data.reduce((acc, entry) => {
    acc[entry.country] = (acc[entry.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const series = Object.values(countryData);
  const labels = Object.keys(countryData);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels,
    title: {
      text: 'Visitor Distribution by Country',
      align: 'center',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return <ChartComponent options={options} series={series} type="pie" />;
};

export default CountryChart1;