import { format, addDays, isSameDay } from 'date-fns';
import { useState, useEffect } from 'react';

const CalendarSidebar = ({ selectedDate, onDateSelect }) => {
  const [dates, setDates] = useState([]);

  // Generate dates for the sidebar (last 30 days + next 7 days)
  useEffect(() => {
    const dateList = [];
    for (let i = -30; i <= 7; i++) {
      dateList.push(addDays(new Date(), i));
    }
    setDates(dateList);
  }, []);

  return (
    <div className="calendar-sidebar">
      <h3>Vocabulary Calendar</h3>
      <div className="date-list">
        {dates.map((date) => (
          <div
            key={date}
            className={`date-item ${isSameDay(date, selectedDate) ? 'active' : ''}`}
            onClick={() => onDateSelect(date)}
          >
            {format(date, 'MMM dd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSidebar;