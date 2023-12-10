import {
  IEvent,
  deleteEvent,
  setSelectedEvent,
} from "@/redux/features/calendarSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EventCard from "./AddEventCard";

const EventListItem = ({ event }: { event: IEvent }) => {
  const { date, id } = event;
  const dispatch = useDispatch();

  const deleteEventHandler = () => {
    dispatch(deleteEvent({ id, date }));
  };

  return (
    <div className="text-md flex justify-between">
      <div className="flex gap-2 items-center">
        <div
          className="w-[12px] h-[12px] rounded-full"
          style={{ background: event.color }}
        ></div>
        <p>{event.title}</p>
      </div>
      <div className="flex gap-2 items-center">
        <TrashIcon
          size={15}
          className="cursor-pointer"
          onClick={deleteEventHandler}
        />

        <PencilIcon size={15} className="cursor-pointer" />
      </div>
    </div>
  );
};
export default EventListItem;
