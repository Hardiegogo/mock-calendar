import { IEvent, deleteEvent } from "@/redux/features/calendarSlice";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import EventCard from "./AddEventCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import EventInfoPopover from "./EventInfoPopover";
import { useState } from "react";

const EventListItem = ({ event }: { event: IEvent }) => {
  const { date, id } = event;
  const [isAddEvent, setIsAddEvent] = useState(false);
  const dispatch = useDispatch();

  const deleteEventHandler = () => {
    dispatch(deleteEvent({ id, date }));
  };

  const dialogClose = () => {
    console.log("ff");
  };

  return (
    <div className="text-md flex justify-between">
      <HoverCard>
        <HoverCardTrigger>
          <div className="flex gap-2 items-center">
            <div
              className="w-[12px] h-[12px] rounded-full"
              style={{ background: event.color }}
            ></div>
            <p>{event.title}</p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="left" sideOffset={10}>
          <EventInfoPopover
            eventInfo={event}
            onlyInfo={true}
            setIsAddEvent={setIsAddEvent}
          />
        </HoverCardContent>
      </HoverCard>

      <div className="flex gap-2 items-center">
        <TrashIcon
          size={15}
          className="cursor-pointer"
          onClick={deleteEventHandler}
        />
        <Popover open={isAddEvent} onOpenChange={setIsAddEvent}>
          <PopoverTrigger>
            <PencilIcon
              size={15}
              className="cursor-pointer"
              onClick={dialogClose}
            />
          </PopoverTrigger>
          <PopoverContent side="right" sideOffset={10}>
            <EventCard
              date={event.date}
              event={event}
              setIsAddEvent={setIsAddEvent}
              editEvent={true}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default EventListItem;
