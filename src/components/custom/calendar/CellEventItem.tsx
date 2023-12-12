import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { IEvent } from "@/redux/features/calendarSlice";
import { PopoverContent } from "@radix-ui/react-popover";
import EventInfoPopover from "./EventInfoPopover";
import EventCard from "./AddEventCard";
import { useState } from "react";

const CellEventItem = ({ eventInfo,dayDate }: { eventInfo: IEvent,dayDate:string }) => {
  const { title } = eventInfo;
  const [isAddEvent, setIsAddEvent] = useState(false);
  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full">
          <div className="flex gap-2 items-center hover:bg-zinc-700 hover:rounded-md py-[1px] px-1 cursor-pointer w-full">
            <div
              className="w-[7px] h-[7px] rounded-[50%]"
              style={{ background: eventInfo.color }}
            ></div>
            <p className="text-xs">{title}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent side="left" sideOffset={10}>
          <EventInfoPopover
            eventInfo={eventInfo}
            setIsAddEvent={setIsAddEvent}
            dayDate={dayDate}
          />
        </PopoverContent>
      </Popover>
      <div className="bg-red-200 h-0">
        <Popover open={isAddEvent} onOpenChange={setIsAddEvent}>
          <PopoverTrigger />
          <PopoverContent side="right" sideOffset={10}>
            <EventCard
              date={eventInfo.date}
              event={eventInfo}
              setIsAddEvent={setIsAddEvent}
              editEvent={true}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CellEventItem;
