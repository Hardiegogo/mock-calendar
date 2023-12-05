import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface IEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface CalendarState {
  events: {
    [date: string]: IEvent[];
  };
  selectedMonth: number;
  selectedDate: string;
  selectedYear: number;
  isSidebar: boolean;
}

const getEvents = () => {
  if (localStorage.getItem("events")) {
    return JSON.parse(localStorage.getItem("events") as string);
  } else return {};
};

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
    changeMonth: (state, { payload }) => {
      state.selectedMonth = payload.value;
    },
    addEvent: (state, { payload }) => {
      const { event } = payload;
      if (state.events[event.date]) {
        state.events[event.date].push(event);
      } else {
        state.events[event.date] = [event];
      }
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    deleteEvent: (state, { payload }) => {
      const { id, date } = payload;
      state.events[date] = state.events[date].filter((event) => {
        return event.id !== id;
      });
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    editEventAction: (state, { payload }) => {
      const { event } = payload;
      const eventIndex = state.events[event.date].findIndex(
        (listEvent) => listEvent.id === event.id
      );
      state.events[event.date][eventIndex] = { ...event };
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
  changeMonth,
  deleteEvent,
  editEventAction,
} = calendarSlice.actions;

export default calendarSlice.reducer;
