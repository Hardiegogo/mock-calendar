import { DayObject, generateMonthDays } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import DayCell from "./DayCell";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function CalendarGrid() {
  const month = useSelector((state: RootState) => state.calendar.selectedMonth);
  const year = useSelector((state: RootState) => state.calendar.selectedYear);
  const [cellHeight, setCellHeight] = useState(130);

  useEffect(() => {
    const updateHeight = () => {
      const height =
        document.getElementsByClassName("cellContainer")[0]?.clientHeight;
      setCellHeight(height);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="text-white grid grid-cols-7 min-h-full"
        key={`${year}-${month}`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween" }}
      >
        {generateMonthDays(year, month).map(
          (dayDetails: DayObject, index: number) => {
            if (index < 7) {
              return (
                <DayCell
                  dayDetails={dayDetails}
                  isStartingSeven={true}
                  key={dayDetails.date}
                  cellHeight={cellHeight}
                />
              );
            } else
              return (
                <DayCell
                  dayDetails={dayDetails}
                  isStartingSeven={false}
                  key={dayDetails.date}
                  cellHeight={cellHeight}
                />
              );
          }
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default CalendarGrid;
