import { DayObject } from "@/lib/utils";
import React, { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ListPlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import EventCard from "./AddEventCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IEvent } from "@/redux/features/calendarSlice";

const EventItem = ({ eventInfo }: { eventInfo: IEvent }) => {
  const { title, description } = eventInfo;
  return (
    <div className="flex gap-2 items-center">
      <div className="w-[7px] h-[7px] rounded-[50%] bg-white"></div>
      <p className="text-sm">{title}</p>
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
  const { date, day, dayObj } = dayDetails;
  const events = useSelector((state: RootState) => state.calendar.events[date]);
  const [isAddEvent,setIsAddEvent]=useState(false)
  return (
    <Popover open={isAddEvent} onOpenChange={setIsAddEvent}>
      <div className="min-h-[120px] border border-slate-200 p-4 bg-zinc-900 ">
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
            <p className="text-center text-sm">{dayObj.format("DD MMM")}</p>
          </div>
          <PopoverTrigger>
            <ListPlusIcon size={15} className="justify-self-end" />
          </PopoverTrigger>
        </div>
        <main className="mt-2">
          {events?.map((eventInfo: IEvent) => (
            <EventItem eventInfo={eventInfo} />
          ))}
        </main>
      </div>

      <PopoverContent>
        <EventCard date={date} setIsAddEvent={setIsAddEvent}/>
      </PopoverContent>
    </Popover>
  );
}

export default DayCell;
