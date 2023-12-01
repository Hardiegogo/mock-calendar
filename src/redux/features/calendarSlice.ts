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
}

const initialState: CalendarState = {
  events: {},
  selectedDate: dayjs().format("DD-MM-YYYY"),
  selectedMonth: dayjs().month(),
  selectedYear: dayjs().year(),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    decrementYear: (state) => {
      state.selectedYear = state.selectedYear - 1;
    },
    addEvent: (state, { payload }) => {
      const { event } = payload;

      if (state.events[event.date]) {
        state.events[event.date].push(event);
      } else {
        state.events[event.date] = [event];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { decrementYear, addEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
