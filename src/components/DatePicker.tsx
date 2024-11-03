import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (dates: [Date, Date]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => (
  <div className="flex justify-center items-center p-4 mt-[-8rem]">
    <div className=" p-4  rounded-lg  ">
      <DatePicker
        selected={startDate}
        onChange={(date) => onDateChange(date as [Date, Date])}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        calendarClassName="custom-calendar"
        className="cal"
      />
    </div>
  </div>
);

export default DateRangePicker;
