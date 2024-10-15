import { useState } from 'react';

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleTaskChange = (day, task) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`]: task
    }));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      days.push(
        <div key={day} className="calendar-day">
          <div className="day-number">{day}</div>
          <input
            type="text"
            className="task-input"
            value={tasks[dateKey] || ''}
            onChange={(e) => handleTaskChange(day, e.target.value)}
            placeholder="Add task"
          />
        </div>
      );
    }

    return days;
  };

  return (
    <div className="task-calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-days">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
        {renderCalendar()}
      </div>
      <style jsx>{`
        .task-calendar {
          max-width: 800px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .calendar-header button {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        .day-name {
          font-weight: bold;
          text-align: center;
          padding: 5px;
        }
        .calendar-day {
          border: 1px solid #ddd;
          padding: 5px;
          min-height: 80px;
        }
        .calendar-day.empty {
          background-color: #f9f9f9;
        }
        .day-number {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .task-input {
          width: 100%;
          padding: 2px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default TaskCalendar;