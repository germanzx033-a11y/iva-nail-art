"use client";

/**
 * IVA Nail Art - Interactive Booking Calendar
 * Luxury appointment scheduling with real-time availability
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  Calendar,
  Sparkles,
  X,
} from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  label: string;
  available: boolean;
}

interface BookingCalendarProps {
  onSelectDateTime: (date: string, timeSlot: TimeSlot) => void;
  selectedDate?: string;
  selectedTime?: string;
  blockedDates?: string[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const TIME_SLOTS: TimeSlot[] = [
  { id: "9am", time: "09:00", label: "9:00 AM", available: true },
  { id: "10am", time: "10:00", label: "10:00 AM", available: true },
  { id: "11am", time: "11:00", label: "11:00 AM", available: true },
  { id: "1pm", time: "13:00", label: "1:00 PM", available: true },
  { id: "2pm", time: "14:00", label: "2:00 PM", available: true },
  { id: "3pm", time: "15:00", label: "3:00 PM", available: true },
  { id: "4pm", time: "16:00", label: "4:00 PM", available: true },
  { id: "5pm", time: "17:00", label: "5:00 PM", available: true },
];

export default function BookingCalendar({
  onSelectDateTime,
  selectedDate,
  selectedTime,
  blockedDates = [],
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [internalSelectedDate, setInternalSelectedDate] = useState<string | null>(selectedDate || null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>(TIME_SLOTS);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: { date: Date; isCurrentMonth: boolean; isToday: boolean; isPast: boolean }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        isPast: date < today,
      });
    }

    return days;
  }, [currentMonth]);

  // Fetch available slots when date changes
  useEffect(() => {
    if (internalSelectedDate) {
      setIsLoadingSlots(true);
      // Simulate API call - replace with actual API
      setTimeout(() => {
        const dayOfWeek = new Date(internalSelectedDate).getDay();
        // Sunday is closed
        if (dayOfWeek === 0) {
          setAvailableSlots([]);
        } else {
          // Randomly mark some slots as unavailable for demo
          setAvailableSlots(TIME_SLOTS.map(slot => ({
            ...slot,
            available: Math.random() > 0.3, // 70% available
          })));
        }
        setIsLoadingSlots(false);
      }, 500);
    }
  }, [internalSelectedDate]);

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const isDateBlocked = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return blockedDates.includes(dateStr);
  };

  const isDateSelectable = (day: { date: Date; isPast: boolean; isCurrentMonth: boolean }) => {
    if (day.isPast || !day.isCurrentMonth) return false;
    if (day.date.getDay() === 0) return false; // Sunday closed
    if (isDateBlocked(day.date)) return false;
    return true;
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    setInternalSelectedDate(dateStr);
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    if (internalSelectedDate && slot.available) {
      onSelectDateTime(internalSelectedDate, slot);
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-[#F1EFE9] rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#7A7A7A]" />
        </button>

        <h3 className="font-serif text-xl text-[#1A1A1A]">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-[#F1EFE9] rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-[#7A7A7A]" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map(day => (
          <div
            key={day}
            className="text-center text-[11px] uppercase tracking-wider text-[#A3A3A3] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const dateStr = day.date.toISOString().split("T")[0];
          const isSelected = dateStr === internalSelectedDate;
          const isSelectable = isDateSelectable(day);
          const isBlocked = isDateBlocked(day.date);

          return (
            <motion.button
              key={index}
              onClick={() => isSelectable && handleDateSelect(day.date)}
              disabled={!isSelectable}
              whileHover={isSelectable ? { scale: 1.05 } : undefined}
              whileTap={isSelectable ? { scale: 0.95 } : undefined}
              className={`
                relative aspect-square flex items-center justify-center text-sm rounded-lg transition-all
                ${!day.isCurrentMonth ? "text-[#E0E0E0]" : ""}
                ${day.isPast ? "text-[#CCCCCC] cursor-not-allowed" : ""}
                ${day.isToday && !isSelected ? "ring-2 ring-[#B76E79] ring-inset" : ""}
                ${isSelected
                  ? "bg-gradient-to-br from-[#722F37] to-[#8B3A44] text-white shadow-lg"
                  : isSelectable
                    ? "hover:bg-[#F1EFE9] text-[#1A1A1A] cursor-pointer"
                    : ""
                }
                ${isBlocked ? "bg-[#FEE2E2] text-[#EF4444]" : ""}
              `}
            >
              {day.date.getDate()}
              {day.isToday && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B76E79]" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Time Slots */}
      <AnimatePresence mode="wait">
        {internalSelectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-6 border-t border-[#EBE8E2]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#B76E79]" />
              <h4 className="text-sm font-medium text-[#1A1A1A]">
                Available Times for {new Date(internalSelectedDate + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                })}
              </h4>
            </div>

            {isLoadingSlots ? (
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-[#F1EFE9] rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="text-center py-8 text-[#7A7A7A]">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No availability on this day</p>
                <p className="text-xs mt-1">Please select another date</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {availableSlots.map(slot => {
                  const isSlotSelected = selectedTime === slot.id;

                  return (
                    <motion.button
                      key={slot.id}
                      onClick={() => handleTimeSelect(slot)}
                      disabled={!slot.available}
                      whileHover={slot.available ? { scale: 1.02 } : undefined}
                      whileTap={slot.available ? { scale: 0.98 } : undefined}
                      className={`
                        relative p-3 rounded-lg text-sm font-medium transition-all
                        ${!slot.available
                          ? "bg-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed line-through"
                          : isSlotSelected
                            ? "bg-gradient-to-br from-[#722F37] to-[#8B3A44] text-white shadow-lg"
                            : "bg-white border border-[#EBE8E2] text-[#1A1A1A] hover:border-[#B76E79] hover:shadow-md"
                        }
                      `}
                    >
                      {slot.label}
                      {isSlotSelected && (
                        <Check className="absolute top-1 right-1 w-3 h-3" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 text-xs text-[#7A7A7A]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full ring-2 ring-[#B76E79] ring-inset" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#722F37] to-[#8B3A44]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#CCCCCC]" />
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}

// Mini Calendar Widget for displaying appointment
export function MiniCalendar({ date, time }: { date: string; time: string }) {
  const dateObj = new Date(date + "T00:00:00");

  return (
    <div className="inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#F9F8F6] to-[#F1EFE9] rounded-xl">
      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase text-[#B76E79] font-medium">
          {dateObj.toLocaleDateString("en-US", { month: "short" })}
        </span>
        <span className="text-lg font-serif text-[#1A1A1A]">
          {dateObj.getDate()}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-[#1A1A1A]">
          {dateObj.toLocaleDateString("en-US", { weekday: "long" })}
        </p>
        <p className="text-xs text-[#7A7A7A]">{time}</p>
      </div>
      <Sparkles className="w-4 h-4 text-[#B76E79] ml-2" />
    </div>
  );
}
