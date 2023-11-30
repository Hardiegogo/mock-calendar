import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface IEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  description?: string;
}

export interface CalendarState {
  events: IEvent[];
  selectedMonth: number;
  selectedDate: string;
  selectedYear: number;
}

const initialState: CalendarState = {
  events: [],
  selectedDate: dayjs().format('DD-MM-YYYY'),
  selectedMonth: dayjs().month(),
  selectedYear: dayjs().year(),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = calendarSlice.actions;

export default calendarSlice.reducer;
