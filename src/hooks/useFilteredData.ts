import { useState, useEffect } from "react";
import { BookingData } from "../utils/dataParser";

const monthMapping: { [key: string]: number } = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export const useFilteredData = (
  data: BookingData[],
  startDate: Date,
  endDate: Date
) => {
  const [filteredData, setFilteredData] = useState<BookingData[]>([]);

  useEffect(() => {
    const filtered = data.filter((entry) => {
      const entryDate = new Date(
        Number(entry.arrival_date_year),
        monthMapping[entry.arrival_date_month],
        Number(entry.arrival_date_day_of_month)
      );
      return entryDate >= startDate && entryDate <= endDate;
    });
    setFilteredData(filtered);
  }, [data, startDate, endDate]);

  return filteredData;
};
