import { IEvent, deleteEvent } from "@/redux/features/calendarSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EventCard from "./AddEventCard";

const EventListItem = ({ event }: { event: IEvent }) => {
  const { date, id } = event;
  const [isAddEvent, setIsAddEvent] = useState(false);
  const dispatch = useDispatch();

  const deleteEventHandler = () => {
    dispatch(deleteEvent({ id, date }));
  };
  return (
    <div className="text-md flex justify-between">
      <p>{event.title}</p>
      <div className="flex gap-2 items-center">
        <TrashIcon
          size={15}
          className="cursor-pointer"
          onClick={deleteEventHandler}
        />
        <Popover open={isAddEvent} onOpenChange={setIsAddEvent}>
          <PopoverTrigger>
            <PencilIcon size={15} className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <EventCard date={date} setIsAddEvent={setIsAddEvent} editEvent={true} event={event}/>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default EventListItem;
