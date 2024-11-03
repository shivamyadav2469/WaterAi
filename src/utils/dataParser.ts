import { parse } from 'papaparse';

export interface BookingData {
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: number;
  children: number;
  babies: number;
  country: string;
  [key: string]: any; 
}

export const parseCSVData = async (csvFilePath: string): Promise<BookingData[]> => {
  try {
    const response = await fetch(csvFilePath);
    if (!response.ok) throw new Error('Network response was not ok');
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results: { data: BookingData[] }) => {
          resolve(results.data);
        },
        error: (error: { message: any; }) => reject(error.message),
      });
    });
  } catch (error) {
    throw error;
  }
};
