import { DayObject } from "@/lib/utils";
import EventListItem from "./DayViewListItem";
import { IEvent } from "@/redux/features/calendarSlice";

function DayView({
  dayDetails,
  events,
}: {
  dayDetails: DayObject;
  events: IEvent[];
}) {
  const { dayObj } = dayDetails;
  return (
    <div>
      <h1 className="text-xl">{dayObj.format("DD MMMM YYYY")}</h1>
      <h3 className="mt-4 text-lg">Events</h3>
      <div className="mt-4 flex flex-col gap-2">
        {events.map((event) => (
          <EventListItem event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}

export default DayView;
