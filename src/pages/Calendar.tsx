import CalendarGrid from "@/components/custom/CalendarGrid";
import Navbar from "@/components/custom/Navbar";
import Sidebar from "@/components/custom/Sidebar";
// import CalendarSidebar from "@/components/custom/CalendarSidebar";

function Calendar() {
  return (
    <div className="">
      <Navbar />
      <div className="w-full flex">
        <Sidebar />
        <div className="flex-1">
          <CalendarGrid />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
