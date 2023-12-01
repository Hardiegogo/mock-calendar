import { DayObject, generateMonthDays } from "@/lib/utils";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import DayCell from "./DayCell";

function CalendarGrid() {
  const month = useSelector((state: RootState) => state.calendar.selectedMonth);
  const year = useSelector((state: RootState) => state.calendar.selectedYear);

  return (
    <div className="text-white grid grid-cols-7">
      {generateMonthDays(year, month).map(
        (dayDetails: DayObject, index: number) => {
          if (index < 7) {
            return <DayCell dayDetails={dayDetails} isStartingSeven={true} />;
          } else
            return <DayCell dayDetails={dayDetails} isStartingSeven={false} />;
        }
      )}
    </div>
  );
}

export default CalendarGrid;
