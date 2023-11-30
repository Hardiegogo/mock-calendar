import CalendarGrid from "@/components/custom/CalendarGrid";
import Navbar from "@/components/custom/Navbar";
// import CalendarSidebar from "@/components/custom/CalendarSidebar";

function Calendar() {
  return (
    <div className="flex">
      <div className="w-full">
        <Navbar/>
        <CalendarGrid />
      </div>
    </div>
  );
}

export default Calendar;
