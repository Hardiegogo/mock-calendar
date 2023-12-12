import Navbar from "@/components/custom/Navbar";
import Sidebar from "@/components/custom/Sidebar";
import CalendarGrid from "@/components/custom/calendar/CalendarGrid";

function Calendar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full flex min-h-full flex-1">
        <Sidebar />
        <div className="flex-1 min-h-full">
          <CalendarGrid />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
