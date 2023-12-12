import { DayObject } from "@/lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ListPlusIcon } from "lucide-react";
import EventCard from "./AddEventCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IEvent } from "@/redux/features/calendarSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DayView from "./DayView";
import CellEventItem from "./CellEventItem";
import { giveCellEvents } from "@/lib/giveCellEvents";

function DayCell({
  dayDetails,
  isStartingSeven,
}: {
  dayDetails: DayObject;
  isStartingSeven: boolean;
}) {
  const { date, dayObj } = dayDetails;
  const events = useSelector((state: RootState) => state.calendar.events[date]);
  const repeatingEvents = useSelector(
    (state: RootState) => state.calendar.events.repeatingEvents
  );
  const eventsToBeDisplayed = giveCellEvents(events, repeatingEvents, date);
  const [isAddEvent, setIsAddEvent] = useState(false);
  return (
    <Dialog>
      <div className="min-h-[130px] border-[0.5px] border-slate-200 p-4 bg-zinc-900 ">
        <div>
          {isStartingSeven ? (
            <p className="text-center text-sm text-zinc-300 cursor-pointer">
              {dayObj.format("dddd")}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between w-full">
          <div>
            <DialogTrigger>
              <p className="text-center text-sm">{dayObj.format("DD MMM")}</p>
            </DialogTrigger>
          </div>
          <Popover open={isAddEvent} onOpenChange={setIsAddEvent}>
            <PopoverTrigger>
              <ListPlusIcon size={15} className="justify-self-end" />
            </PopoverTrigger>
            <PopoverContent side="right" avoidCollisions={true}>
              <EventCard
                date={date}
                setIsAddEvent={setIsAddEvent}
                editEvent={false}
              />
            </PopoverContent>
          </Popover>
        </div>
        <main className=" flex flex-col">
          {eventsToBeDisplayed && eventsToBeDisplayed?.length
            ? eventsToBeDisplayed
                ?.slice(0, 2)
                ?.map((eventInfo: IEvent) => (
                  <CellEventItem eventInfo={eventInfo} key={eventInfo.id} dayDate={date}/>
                ))
            : ""}
          <DialogTrigger>
            {eventsToBeDisplayed && eventsToBeDisplayed?.length > 2 ? (
              <p className="text-xs pl-1 mt-1 w-full  hover:bg-zinc-700 hover:rounded-md py-[1px] cursor-pointer text-left">
                {" "}
                + {eventsToBeDisplayed.length - 2} more
              </p>
            ) : (
              ""
            )}
          </DialogTrigger>
        </main>
      </div>

      <DialogContent className="bg-zinc-900 text-slate-50">
        <DayView dayDetails={dayDetails} events={eventsToBeDisplayed} />
      </DialogContent>
    </Dialog>
  );
}

export default DayCell;
