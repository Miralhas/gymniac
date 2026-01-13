'use client'

import { cn } from '@/utils/common-utils';
import { DAYS_OF_WEEK } from '@/utils/date-utils';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isFuture,
  isSameMonth,
  isSaturday,
  isSunday,
  isToday,
  lastDayOfMonth,
  nextSaturday,
  parse,
  startOfToday,
  subDays,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

const WorkoutCalendar = () => {
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));

  const handleNextMonth = () => {
    const currentDate = parse(currMonth, "MMM-yyyy", new Date());
    const next = addMonths(currentDate, 1);
    setCurrMonth(format(next, "MMM-yyyy"));
  }

  const handlePreviousMonth = () => {
    const currentDate = parse(currMonth, "MMM-yyyy", new Date());
    const previous = subMonths(currentDate, 1);
    setCurrMonth(format(previous, "MMM-yyyy"));
  }

  const monthFirstDay = parse(currMonth, "MMM-yyyy", new Date());
  const monthLastDay = lastDayOfMonth(monthFirstDay);

  const daysInMonth = eachDayOfInterval({
    start: monthFirstDay,
    end: monthLastDay,
  });

  // Get last days of last month so it doesn't create a gap in the calendar.
  const padStart = eachDayOfInterval({ start: subDays(monthFirstDay, monthFirstDay.getDay()), end: monthFirstDay }).slice(0, -1);

  // Get the number of days until next Saturday so there are no gaps in the calendar. Calendar always ends on a satuday. 
  // Only add end pad days if month doesn't ends on a satuday
  const padEnd = eachDayOfInterval({ start: monthLastDay, end: isSaturday(monthLastDay) ? monthLastDay : nextSaturday(monthLastDay) }).slice(1);

  const all = [...padStart, ...daysInMonth, ...padEnd];

  return (
    <>
      <p>{currMonth}</p>
      <div className='space-x-2'>
        <Button variant="ghost" size="icon" onClick={handlePreviousMonth}><ChevronLeft /></Button>
        <Button variant="ghost" size="icon" onClick={handleNextMonth}><ChevronRight /></Button>
      </div>
      <div className="grid grid-cols-7 grid-rows-[min-content_max-content] relative z-20 overflow-hidden">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className='col-span-1 border border-zinc-50/10 p-1.25'>
            <p className='text-foreground text-center text-sm capitalize'>{day}</p>
          </div>
        ))}

        {all.map((day, index) => {
          return (
            <div key={index} className={cn("p-4 py-9 md:p-6 md:py-16 relative border border-zinc-50/10")}>
              <span className={cn(
                `absolute top-0 left-0 text-foreground/90 text-xs md:text-sm m-1`,
                isToday(day) && "text-emerald-500",
                isFuture(day) && "text-foreground/50",
                !isSameMonth(day, today) && "text-foreground/50",
              )}>
                {format(day, "d")}
              </span>
            </div>
          )
        })}

      </div>
    </>
  )
}

export default WorkoutCalendar;
