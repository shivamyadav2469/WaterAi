import React, { useState, useEffect, useMemo } from "react";
import DateRangePicker from "./components/DatePicker";
import TimeSeriesChart from "./components/charts/TimeSeriesChart";
import CountryChart from "./components/charts/CountryChart";
import SparklineChart from "./components/charts/SparklineChart";
import { BookingData, parseCSVData } from "./utils/dataParser";
import { useFilteredData } from "./hooks/useFilteredData";
import Header from "./components/Header";
import CountryChart1 from "./components/charts/CountryChart1";

const App: React.FC = () => {
  const [data, setData] = useState<BookingData[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(2015, 6, 1),
    new Date(2015, 6, 31),
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filteredData = useFilteredData(data, dateRange[0], dateRange[1]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData = await parseCSVData("/hotel_bookings_1000.csv");
        setData(fetchedData);
        console.log("Fetched Data:", fetchedData);
      } catch (error) {
        setError("Error fetching data: " + error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        {/* Filters Section */}
        <div className="  p-10 rounded-lg mb-10">
          <DateRangePicker
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onDateChange={setDateRange}
          />
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Bookings Over Time
            </h3>
            <TimeSeriesChart data={memoizedFilteredData} />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Bookings by Country (Bar Chart)
            </h3>
            <CountryChart data={memoizedFilteredData} />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Visitor Details (Sparkline)
            </h3>
            <SparklineChart
              data={memoizedFilteredData}
              dataKeys={["adults", "children"]}
            />
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Bookings by Country (Pie Chart)
            </h3>
            <CountryChart1 data={memoizedFilteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
