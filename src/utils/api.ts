import { parseCSVData, BookingData } from '../utils/dataParser';

const CSV_FILE_PATH = './hotel_bookings_1000.csv';
console.log(CSV_FILE_PATH)

export const fetchBookingData = async (): Promise<BookingData[]> => {
  try {
    const data = await parseCSVData(CSV_FILE_PATH);
    return data;
  } catch (error) {
    console.error('Error fetching booking data:', error);
    throw error;
  }
};



// function addNumbers(a: number, b: number) { 
//   return a + b; 
// } 

// var sum: number = addNumbers(10, 15) 

// console.log('Sum of the two numbers is: ' +sum); 