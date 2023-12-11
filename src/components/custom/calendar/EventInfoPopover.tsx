import { IEvent, deleteEvent } from "@/redux/features/calendarSlice";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { PenLineIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDispatch } from "react-redux";

function convertDateFormat(inputDateString: string) {
  // Split the input date string into day, month, and year
  const [day, month, year] = inputDateString.split("-");

  // Create a new date string with the desired format 'MM-DD-YYYY'
  const outputDateString = `${month}-${day}-${year}`;

  return outputDateString;
}
function EventInfoPopover({
  eventInfo,
  setIsAddEvent,
  onlyInfo,
}: {
  eventInfo: IEvent;
  setIsAddEvent: React.Dispatch<React.SetStateAction<boolean>>;
  onlyInfo?: true;
}) {
  const { startTime, endTime, title, description, date, color, id } = eventInfo;
  const dispatch = useDispatch();
  const deleteEventHandler = () => {
    dispatch(deleteEvent({ id, date }));
  };
  return (
    <motion.div
      animate={{ scale: 1, opacity: 1, x: 0 }}
      initial={{ scale: 0.5, opacity: 0, x: 100 }}
      transition={{ duration: 0.08, type: "tween" }}
      className="bg-zinc-900 p-4 w-90 border border-white rounded-md max-w-md"
    >
      {onlyInfo ? (
        ""
      ) : (
        <header className="flex justify-end">
          <div className="flex gap-2 items-center">
            <TrashIcon
              size={15}
              className="cursor-pointer"
              onClick={deleteEventHandler}
            />

            <PencilIcon
              size={15}
              className="cursor-pointer"
              onClick={() => {
                // dispatch(setSelectedEvent(eventInfo))
                setIsAddEvent(true);
              }}
            />
          </div>
        </header>
      )}
      <div className="flex gap-2 items-center mt-1">
        <div
          className="w-4 h-4 rounded-full"
          style={{ background: color }}
        ></div>
        <h2 className="text-md">{title}</h2>
      </div>
      <div className="mt-1 ml-6 flex gap-2 items-center">
        <p className="text-sm font-light">
          {dayjs(convertDateFormat(date), { format: "DD-MM-YYYY" }).format(
            "dddd, MMMM DD"
          )}
        </p>
        <div className="w-[1px] h-[12px] bg-white"></div>
        <p className="text-sm font-light">{startTime + " - " + endTime}</p>
      </div>
      {description?.length ? (
        <div className="mt-2 flex gap-2 items-start w-full">
          <div>
            <PenLineIcon size={15} />
          </div>
          <p className="text-xs font-light">{description}</p>
        </div>
      ) : (
        ""
      )}
    </motion.div>
  );
}

export default EventInfoPopover;
