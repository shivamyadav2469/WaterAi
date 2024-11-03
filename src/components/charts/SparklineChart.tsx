import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

interface BookingData {
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  [key: string]: string;
}

interface SparklineChartProps {
  data: BookingData[];
  dataKeys: string[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, dataKeys }) => {
  const [chartData, setChartData] = useState<any>({
    adults: {
      series: [{ data: [] }],
      options: {
        chart: {
          type: "area",
          height: 160,
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        fill: {
          opacity: 0.4,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          show: false,
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontSize: "12px",
          },
        },
        colors: ["#00BFFF"],
        title: {
          text: "Adults",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
          },
        },
      },
    },
    children: {
      series: [{ data: [] }],
      options: {
        chart: {
          type: "area",
          height: 160,
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        fill: {
          opacity: 0.1,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          show: false,
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontSize: "12px",
          },
        },
        colors: ["#FF6347"],
        title: {
          text: "Children",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
          },
        },
      },
    },
    total: {
      series: [{ data: [] }],
      options: {
        chart: {
          type: "area",
          height: 160,
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        fill: {
          opacity: 0.4,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          show: false,
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontSize: "12px",
          },
        },
        colors: ["#32CD32"],
        title: {
          text: "Total",
          align: "left",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
          },
        },
      },
    },
  });

  const [totals, setTotals] = useState<{
    adults: number;
    children: number;
    total: number;
  }>({
    adults: 0,
    children: 0,
    total: 0,
  });

  useEffect(() => {
    if (!dataKeys || dataKeys.length !== 2 || data.length === 0) {
      console.error("Invalid data keys or no data available.");
      return;
    }

    const adultsData: number[] = [];
    const childrenData: number[] = [];
    const totalData: number[] = [];

    let totalAdults = 0;
    let totalChildren = 0;

    data.forEach((entry) => {
      const adults = Number(entry[dataKeys[0]]) || 0;
      const children = Number(entry[dataKeys[1]]) || 0;

      adultsData.push(adults);
      childrenData.push(children);
      totalData.push(adults + children);

      totalAdults += adults;
      totalChildren += children;
    });

    setChartData((prev) => ({
      adults: {
        ...prev.adults,
        series: [{ data: adultsData }],
        options: {
          ...prev.adults.options,
          title: {
            text: `Adults: ${totalAdults}`,
          },
        },
      },
      children: {
        ...prev.children,
        series: [{ data: childrenData }],
        options: {
          ...prev.children.options,
          title: {
            text: `Children: ${totalChildren}`,
          },
        },
      },
      total: {
        ...prev.total,
        series: [{ data: totalData }],
        options: {
          ...prev.total.options,
          title: {
            text: `Total: ${totalAdults + totalChildren}`,
          },
        },
      },
    }));

    setTotals({
      adults: totalAdults,
      children: totalChildren,
      total: totalAdults + totalChildren,
    });
  }, [data, dataKeys]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Chart
          options={chartData.adults.options}
          series={chartData.adults.series}
          type="area"
          height={160}
        />
        {/* <p className="mt-2 text-center text-lg font-semibold">{`Total Adults: ${totals.adults}`}</p> */}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Chart
          options={chartData.children.options}
          series={chartData.children.series}
          type="area"
          height={160}
        />
        {/* <p className="mt-2 text-center text-lg font-semibold">{`Total Children: ${totals.children}`}</p> */}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <Chart
          options={chartData.total.options}
          series={chartData.total.series}
          type="area"
          height={160}
        />
        {/* <p className="mt-2 text-center text-lg font-semibold">{`Total: ${totals.total}`}</p> */}
      </div>
    </div>
  );
};

export default SparklineChart;
