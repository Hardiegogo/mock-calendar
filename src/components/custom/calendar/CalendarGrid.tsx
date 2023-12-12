import { DayObject, generateMonthDays } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import DayCell from "./DayCell";
import { AnimatePresence, motion } from "framer-motion";

function CalendarGrid() {
  const month = useSelector((state: RootState) => state.calendar.selectedMonth);
  const year = useSelector((state: RootState) => state.calendar.selectedYear);

  return (
    <AnimatePresence>
      <motion.div
        className="text-white grid grid-cols-7"
        key={`${year}-${month}`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween" }}
      >
        {generateMonthDays(year, month).map(
          (dayDetails: DayObject, index: number) => {
            if (index < 7) {
              return <DayCell dayDetails={dayDetails} isStartingSeven={true} key={dayDetails.date} />;
            } else
              return (
                <DayCell dayDetails={dayDetails} isStartingSeven={false} key={dayDetails.date}/>
              );
          }
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default CalendarGrid;
