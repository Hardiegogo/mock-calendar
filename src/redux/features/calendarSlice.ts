import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface IEvent {
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

const initialState: CalendarState = {
  events: {},
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
    },
    switchSidebar: (state) => {
      state.isSidebar = !state.isSidebar;
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrementYear, addEvent, switchSidebar, incrementYear,changeMonth } =
  calendarSlice.actions;

export default calendarSlice.reducer;
