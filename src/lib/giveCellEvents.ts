import { IEvent } from "@/redux/features/calendarSlice";
import { giveSortedEvents } from "./giveSortedEvents";

export const giveCellEvents = (
  events: IEvent[],
  repeatingEvents: IEvent[],
  date: string
) => {
  let result;
  if (events?.length) {
    if (repeatingEvents?.length) {
      result = [...events, ...repeatingEvents];
    } else {
      result = [...events];
    }
  } else {
    if (repeatingEvents?.length) {
      result = [...repeatingEvents];
    } else result = null;
  }
  return giveSortedEvents(result, date);
};
