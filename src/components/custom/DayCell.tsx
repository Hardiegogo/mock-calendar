import { DayObject } from "@/lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ListPlusIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { motion } from "framer-motion";
import EventCard from "./AddEventCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IEvent } from "@/redux/features/calendarSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DayView from "./DayView";

const EventItem = ({ eventInfo }: { eventInfo: IEvent }) => {
  const { title } = eventInfo;
  return (
    <div className="flex gap-3 items-center">
      <div className="w-[7px] h-[7px] rounded-[50%] bg-white"></div>
      <p className="text-xs">{title}</p>
    </div>
  );
};

function DayCell({
  dayDetails,
  isStartingSeven,
}: {
  dayDetails: DayObject;
  isStartingSeven: boolean;
}) {
  const { date, dayObj } = dayDetails;
  const events = useSelector((state: RootState) => state.calendar.events[date]);
  const [isAddEvent, setIsAddEvent] = useState(false);
  return (
    <Dialog>
      <div className="min-h-[130px] border border-slate-200 p-4 bg-zinc-900 ">
        <div>
          {isStartingSeven ? (
            <p className="text-center text-sm text-zinc-300">
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
            <PopoverContent>
              <EventCard
                date={date}
                setIsAddEvent={setIsAddEvent}
                editEvent={false}
              />
            </PopoverContent>
          </Popover>
        </div>
        <main className="mt-2 flex flex-col gap-1">
          {events?.map((eventInfo: IEvent) => (
            <EventItem eventInfo={eventInfo} key={eventInfo.id}/>
          ))}
        </main>
      </div>

      <DialogContent className="bg-zinc-800 text-slate-50">
        <DayView dayDetails={dayDetails} events={events} />
      </DialogContent>
    </Dialog>
  );
}

export default DayCell;
