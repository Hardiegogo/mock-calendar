import {
  changeMonth,
  decrementYear,
  incrementYear,
  switchSidebar,
} from "@/redux/features/calendarSlice";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import {
  ChevronLeftCircle,
  ChevronRightCircle,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MenuIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const year = useSelector((state: RootState) => state.calendar.selectedYear);
  const month = useSelector((state: RootState) => state.calendar.selectedMonth);
  const handleMonthChange = (
    e: React.MouseEvent,
    value: "decrement" | "increment"
  ) => {
    if (value === "decrement") {
      if (month === 0) {
        dispatch(decrementYear());
        dispatch(changeMonth({ value: 11 }));
      } else {
        dispatch(changeMonth({ value: month - 1 }));
      }
    } else if (value === "increment") {
      if (month === 11) {
        dispatch(incrementYear());
        dispatch(changeMonth({ value: 0 }));
      } else {
        dispatch(changeMonth({ value: month + 1 }));
      }
    }
  };
  return (
    <div className="p-4 text-center text-white border-white border-b min-w-full flex min-h-[70px] items-center">
      <div className="flex gap-4">
        <MenuIcon
          className="cursor-pointer"
          onClick={() => dispatch(switchSidebar())}
        />

        <div className="flex gap-1">
          <ChevronsLeftIcon
            className="cursor-pointer"
            onClick={() => {
              dispatch(decrementYear());
            }}
          />
          <ChevronLeftCircle
            className="cursor-pointer"
            onClick={(e) => {
              handleMonthChange(e, "decrement");
            }}
          />
          <h1 className="w-[130px] text-md">
            {dayjs().month(month).format("MMMM") + " "}{" "}
            {dayjs().year(year).format("YYYY")}
          </h1>
          <ChevronRightCircle
            className="cursor-pointer"
            onClick={(e) => {
              handleMonthChange(e, "increment");
            }}
          />
          <ChevronsRightIcon
            className="cursor-pointer"
            onClick={() => dispatch(incrementYear())}
          />
        </div>
      </div>
      <div className="w-full text-xl">
        <h1 className="w-fit ml-[35%]">Calendar</h1>
      </div>
    </div>
  );
}

export default Navbar;
