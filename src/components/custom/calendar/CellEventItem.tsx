import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { IEvent } from "@/redux/features/calendarSlice";
import { PopoverContent } from "@radix-ui/react-popover";
import EventInfoPopover from "./EventInfoPopover";

const CellEventItem = ({
  eventInfo,
  setIsAddEvent,
}: {
  eventInfo: IEvent;
  setIsAddEvent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { title } = eventInfo;
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-3 items-center hover:bg-zinc-700 hover:rounded-md py-[2px] px-1 cursor-pointer">
          <div
            className="w-[7px] h-[7px] rounded-[50%]"
            style={{ background: eventInfo.color }}
          ></div>
          <p className="text-xs">{title}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent side="left" sideOffset={10}>
        <EventInfoPopover eventInfo={eventInfo} setIsAddEvent={setIsAddEvent} />
      </PopoverContent>
    </Popover>
  );
};

export default CellEventItem;

{
  /* <Popover open={isAddEvent} onOpenChange={setIsAddEvent}>
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
</Popover> */
}
