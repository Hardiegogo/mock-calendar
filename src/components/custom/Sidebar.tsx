import { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Calendar } from "../ui/calendar";

function Sidebar() {
  const isSideBar = useSelector((state: RootState) => state.calendar.isSidebar);

  const [date, setDate] = useState<Date | undefined>();
  console.log(date);

  return (
    <AnimatePresence mode="wait">
      {isSideBar && (
        <motion.div
          className="min-h-screen overflow-hidden"
          initial={{ x: -100, opacity: 0, width: 0 }}
          animate={{ x: 0, opacity: 1, width: "20%" }}
          exit={{ x: -100, opacity: 0, width: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          layout
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className=" border"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
