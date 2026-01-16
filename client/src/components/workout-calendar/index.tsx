'use client'

import { cn } from '@/utils/common-utils';
import { DAYS_OF_WEEK } from '@/utils/date-utils';
import {
  addMonths,
  eachDayOfInterval,
  format,
  isSaturday,
  lastDayOfMonth,
  nextSaturday,
  parse,
  startOfToday,
  subDays
} from 'date-fns';
import { useState } from 'react';
import CalendarHeader from './calendar-header';
import GridDays from './grid-days';
import WorkoutModal from './workout-modal';

const WorkoutCalendar = () => {
  const today = startOfToday();
  const [open, setOpen] = useState(false);
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));

  const handleCurrentMonth = (offset: number) => {
    const currentDate = parse(currMonth, "MMM-yyyy", new Date());
    setCurrMonth(format(addMonths(currentDate, offset), "MMM-yyyy"));
  }

  const handleReset = () => {
    setCurrMonth(format(today, "MMM-yyyy"));
  }

  const currentMonthFirstDay = parse(currMonth, "MMM-yyyy", new Date());
  const currentMonthLastDay = lastDayOfMonth(currentMonthFirstDay);

  const daysInMonth = eachDayOfInterval({
    start: currentMonthFirstDay,
    end: currentMonthLastDay,
  });

  // Pad Days are similar how Windows implement it's calendar.

  // Get last days of last month so it doesn't create a gap in the start of the calendar.
  // Calendar always starts on a sunday. 
  // .getDay() returns the day of the week (0 = sunday | 6 = saturday)
  // First day of the month minus the day of the week equals the amount of pad days needed.
  const padStart = eachDayOfInterval({
    start: subDays(currentMonthFirstDay, currentMonthFirstDay.getDay()),
    end: currentMonthFirstDay
  }).slice(0, -1);

  // Get the number of days until next Saturday so there are no gaps in the end of the calendar. 
  // Calendar always ends on a satuday. 
  // Only add end pad days if month doesn't ends on a satuday
  const padEnd = eachDayOfInterval({
    start: currentMonthLastDay,
    end: isSaturday(currentMonthLastDay) ? currentMonthLastDay : nextSaturday(currentMonthLastDay)
  }).slice(1);

  const all = [...padStart, ...daysInMonth, ...padEnd];

  return (
    <>
      <CalendarHeader
        currentMonthFirstDay={currentMonthFirstDay}
        currentMonthLastDay={currentMonthLastDay}
        handleCurrentMonth={handleCurrentMonth}
        handleReset={handleReset}
        today={today}
      />
      <div className="grid grid-cols-7 grid-rows-[min-content_max-content] relative z-20 overflow-hidden">
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={day} className='col-span-1 border border-zinc-50/10 p-1.25'>
            <p className={cn('text-foreground text-center text-sm capitalize', today.getDay() === index && "text-accent font-semibold")}>{day}</p>
          </div>
        ))}
        <GridDays calendarDays={all} today={today} setOpen={setOpen} />
      </div>
      <WorkoutModal open={open} setOpen={setOpen} />
    </>
  )
}

export default WorkoutCalendar;
