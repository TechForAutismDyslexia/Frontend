import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Tooltip } from 'react-tooltip';

function Calendar() {
  const events = [
    {
      title: 'Appointment 1',
      date: '2024-10-14',
      description: 'Child’s therapy session',
    },
    {
      title: 'Event 2',
      date: '2024-10-16',
      description: 'Parent-teacher meeting',
    },
  ];

  return (
    <>
      <FullCalendar
       events={events}
       eventMouseEnter={
           (arg) => {
               <ReactTooltip id="registerTip" place="top" effect="solid">
                   {arg.events.title}
               </ReactTooltip>
               // alert(arg.event.title);
           }
       }
       plugins={[dayGridPlugin]}
      />
      <Tooltip id="tooltip" />
    </>
  );
}

export default Calendar;
