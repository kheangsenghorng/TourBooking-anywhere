// ui/DatePicker.js
const DatePicker = ({ checkIn, checkOut, onCheckInChange, onCheckOutChange }) => {
    return (
      <div className="w-full">
        <small className="text-gray-500">Check-in/out dates</small>
        <div className="flex justify-between mt-2">
          <input
            type="date"
            className="border border-gray-300 rounded-full p-2 text-gray-800 w-[48%]"
            value={checkIn || ""}
            onChange={(e) => onCheckInChange(e.target.value)}
          />
          <span className="mx-2 text-gray-500">to</span>
          <input
            type="date"
            className="border border-gray-300 rounded-full p-2 text-gray-800 w-[48%]"
            value={checkOut || ""}
            onChange={(e) => onCheckOutChange(e.target.value)}
          />
        </div>
      </div>
    );
  };
  
  export default DatePicker;
  