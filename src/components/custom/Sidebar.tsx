import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "../ui/calendar";
import dayjs from "dayjs";
import { changeMonth, changeYear } from "@/redux/features/calendarSlice";

function Sidebar() {
  const isSideBar = useSelector((state: RootState) => state.calendar.isSidebar);
  const dispatch = useDispatch();

  const [date, setDate] = useState<Date | undefined>();
  console.log(date);
  useEffect(() => {
    if (date) {

      dispatch(
        changeMonth({
          value: dayjs(date).get("month"),
        })
      );
      
      dispatch(
        changeYear({
          value: dayjs(date).get("year"),
        })
      );
    }
  }, [date]);

  return (
    <AnimatePresence mode="wait" key={1}>
      {isSideBar && (
        <motion.div
          className="min-h-screen overflow-hidden"
          initial={{ x: -100, opacity: 0, width: 0 }}
          animate={{ x: 0, opacity: 1, width: "20%" }}
          exit={{ x: -100, opacity: 0, width: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className=" border animate-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
