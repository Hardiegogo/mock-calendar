import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  IEvent,
  addEvent,
  editEventAction,
  setSelectedEvent,
} from "@/redux/features/calendarSlice";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { eventColors } from "./constants";
import { RootState } from "@/redux/store";

const EventInputSchema = z.object({
  title: z.string().min(3).max(300),
  description: z.string().optional(),
  date: z.string().min(6),
  color: z.string(),
  startTime: z.string().min(5),
  endTime: z.string().min(5),
});

function EventCard({
  date,
  setIsAddEvent,
  editEvent,
}: {
  date: string;
  setIsAddEvent: React.Dispatch<React.SetStateAction<boolean>>;
  editEvent: boolean;
}) {
  const event = useSelector((state: RootState) => state.calendar.selectedEvent);
  const [title, setTitle] = useState(editEvent === true ? event?.title : "");
  const [description, setDescription] = useState(
    editEvent === true ? event?.description : ""
  );
  const [startTime, setStartTime] = useState(editEvent ? event?.startTime : "");
  const [endTime, setEndTime] = useState(editEvent ? event?.endTime : "");
  const [selectedColor, setSelectedColor] = useState(
    editEvent ? event?.color : "white"
  );
  const [errors, setErrors] =
    useState<z.inferFlattenedErrors<typeof EventInputSchema>>();
  const dispatch = useDispatch();

  const saveEventHandler = (type: string) => {
    try {
      const parsedInput = EventInputSchema.safeParse({
        title,
        description,
        date,
        selectedColor,
        startTime,
        endTime,
        color: selectedColor,
      });
      if (!parsedInput.success) {
        setErrors(parsedInput.error.flatten());
      } else {
        if (type === "save") {
          dispatch(
            addEvent({
              event: {
                id: uuidv4(),
                title,
                description,
                date,
                startTime,
                endTime,
                color: selectedColor,
              },
            })
          );
        } else if (type === "edit") {
          dispatch(
            editEventAction({
              event: {
                id: event?.id,
                title,
                description,
                date,
                selectedColor,
                startTime,
                endTime,
                color: selectedColor,
              },
            })
          );
        }

        setIsAddEvent(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      animate={{ scale: 1, opacity: 1, x: 0 }}
      initial={{ scale: 0.5, opacity: 0, x: -100 }}
      transition={{ duration: 0.08, type: "tween" }}
      className="z-10 w-[270px] min-h-[275px] bg-zinc-900 border border-slate-300 shadow-2xl p-5 rounded-md"
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
            <input
              type="time"
              name=""
              id=""
              className="text-black"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maxWidth">End time</Label>
            <input
              type="time"
              name=""
              id=""
              className="text-black"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <h4 className="font-medium text-sm">Select color</h4>
          <div className="mt-2 flex gap-3">
            {eventColors.map((color: string) => {
              return (
                <div
                  style={{ background: color }}
                  className={`w-[20px] h-[20px] rounded-full hover:scale-110 cursor-pointer hover:border hover:border-white ${
                    color === selectedColor ? "border border-white" : ""
                  }`}
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <div>
          {errors?.fieldErrors && (
            <p className="text-xs text-red-400 text-center mb-1">
              Please fill the details correctly
            </p>
          )}
          {editEvent === false ? (
            <Button
              className="bg-white text-zinc-950 hover:bg-zinc-300 w-full"
              onClick={() => {
                saveEventHandler("save");
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              className="bg-white text-zinc-950 hover:bg-zinc-300 w-full"
              onClick={() => {
                saveEventHandler("edit");
              }}
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
