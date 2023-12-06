import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  IEvent,
  addEvent,
  editEventAction,
} from "@/redux/features/calendarSlice";
import { v4 as uuidv4 } from "uuid";

function EventCard({
  date,
  setIsAddEvent,
  editEvent,
  event,
}: {
  date: string;
  setIsAddEvent: React.Dispatch<React.SetStateAction<boolean>>;
  editEvent: boolean;
  event?: IEvent;
}) {
  const [title, setTitle] = useState(editEvent === true ? event?.title : "");
  const [description, setDescription] = useState(
    editEvent === true ? event?.description : ""
  );
  const [startTime, SetStartTime] = useState("");
  const dispatch = useDispatch();

  const saveEventHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addEvent({
        event: {
          id: uuidv4(),
          title,
          description,
          date,
        },
      })
    );
    setIsAddEvent(false);
  };
  const editEventHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      editEventAction({
        event: {
          id: event?.id,
          title,
          description,
          date,
        },
      })
    );
    setIsAddEvent(false);
  };
  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0.5 }}
      className="z-10 w-[270px] min-h-[275px] bg-zinc-900 border border-slate-300 shadow-2xl p-5"
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none text-center">
            {editEvent ? "Edit event" : "Add Event"}
          </h4>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Title</Label>
            <Input
              id="width"
              defaultValue=""
              className="col-span-2 h-8 text-zinc-950"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maxWidth">Description</Label>
            <textarea
              id="maxWidth"
              className="w-full h-20 rounded-md text-zinc-950 p-1 text-sm"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maxWidth">Start time</Label>
            <input type="time" name="" id="" className="text-black" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maxWidth">End time</Label>
            <input
              type="time"
              name=""
              id=""
              className="text-black"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
        <div>
          {editEvent === false ? (
            <Button
              className="bg-white text-zinc-950 hover:bg-zinc-300 w-full"
              onClick={saveEventHandler}
            >
              Submit
            </Button>
          ) : (
            <Button
              className="bg-white text-zinc-950 hover:bg-zinc-300 w-full"
              onClick={editEventHandler}
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;
