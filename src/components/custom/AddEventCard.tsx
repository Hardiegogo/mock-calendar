import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addEvent } from "@/redux/features/calendarSlice";

function EventCard({
  date,
  setIsAddEvent,
}: {
  date: string;
  setIsAddEvent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const saveEventHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addEvent({
        event: {
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
      className="z-10 w-[250px] min-h-[275px] bg-zinc-950 border  border-slate-200 rounded-xl p-4"
    >
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none text-center">Add Event</h4>
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
          {/* <div className="flex flex-col gap-2">
          <Label htmlFor="maxWidth">Start time</Label>

          <div>
            <input type="time" name="" id="" className="text-black" />
          </div>
        </div> */}
        </div>
        <div>
          <Button
            className="bg-white text-zinc-950 hover:bg-zinc-300 w-full"
            onClick={saveEventHandler}
          >
            Submit
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;
