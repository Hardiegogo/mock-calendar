import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface IEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  startTime: string;
  endTime: string;
  color: string;
  repeatingEvent: boolean;
  leaveDates?: string[];
}

export interface CalendarState {
  events: {
    [date: string]: IEvent[];
    repeatingEvents: IEvent[];
  };
  selectedMonth: number;
  selectedDate: string;
  selectedYear: number;
  isSidebar: boolean;
}

const getEvents = () => {
  if (localStorage.getItem("events")) {
    const events = JSON.parse(localStorage.getItem("events") as string);
    for (const key in events) {
      if (key !== "repeatingEvents" && !events[key].length) {
        delete events[key];
      }
    }
    localStorage.setItem("events", JSON.stringify(events));
    return events;
  } else return {};
};

getEvents();

const initialState: CalendarState = {
  events: getEvents(),
  selectedDate: dayjs().format("DD-MM-YYYY"),
  selectedMonth: dayjs().month(),
  selectedYear: dayjs().year(),
  isSidebar: false,
};

export const calendarSlice = createSlice({
  name: "calendar",

  initialState,

  reducers: {
    decrementYear: (state) => {
      state.selectedYear = state.selectedYear - 1;
    },
    incrementYear: (state) => {
      state.selectedYear = state.selectedYear + 1;
    },
    changeYear: (state, { payload }) => {
      state.selectedYear = payload.value;
    },
    changeMonth: (state, { payload }) => {
      state.selectedMonth = payload.value;
    },
    addEvent: (state, { payload }) => {
      const { event } = payload;

      if (event.repeatingEvent) {
        if (state.events?.repeatingEvents) {
          state.events.repeatingEvents.push(event);
        } else {
          state.events.repeatingEvents = [event];
        }
      } else {
        if (state.events[event.date]) {
          state.events[event.date].push(event);
        } else {
          state.events[event.date] = [event];
        }
      }

      localStorage.setItem("events", JSON.stringify(state.events));
    },
    deleteEvent: (state, { payload }) => {
      const { event, dayDate } = payload;
      if (event.repeatingEvent) {
        const eventToChange = state.events.repeatingEvents.find(
          (curr) => curr.id === event.id
        );
        if (eventToChange) {
          if (!eventToChange?.leaveDates) {
            eventToChange.leaveDates = [dayDate];
          } else {
            eventToChange.leaveDates.push(dayDate);
          }
        }
      } else {
        state.events[event.date] = state.events[event.date].filter(
          (currevent) => {
            return currevent.id !== event.id;
          }
        );
      }

      localStorage.setItem("events", JSON.stringify(state.events));
    },
    editEventAction: (state, { payload }) => {
      const { event } = payload;
      const checkIndexinRepeatingEvents =
        state.events.repeatingEvents.findIndex(
          (listEvent) => listEvent.id === event.id
        );
      if (event.repeatingEvent) {
        if (checkIndexinRepeatingEvents >= 0) {
          state.events.repeatingEvents[checkIndexinRepeatingEvents] = {
            ...event,
          };
        } else {
          state.events.repeatingEvents.push(event);
          state.events[event.date] = state.events[event.date].filter(
            (currevent) => {
              return currevent.id !== event.id;
            }
          );
        }
      } else {
        if (checkIndexinRepeatingEvents >= 0) {
          state.events.repeatingEvents.splice(checkIndexinRepeatingEvents, 1);
          if (state.events[event.date]) {
            state.events[event.date].push(event);
          } else {
            state.events[event.date] = [event];
          }
        } else {
          const eventIndex = state.events[event.date].findIndex(
            (listEvent) => listEvent.id === event.id
          );
          state.events[event.date][eventIndex] = { ...event };
        }
      }
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    switchSidebar: (state) => {
      state.isSidebar = !state.isSidebar;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  decrementYear,
  addEvent,
  switchSidebar,
  incrementYear,
  changeYear,
  changeMonth,
  deleteEvent,
  editEventAction,
} = calendarSlice.actions;

export default calendarSlice.reducer;
