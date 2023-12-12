import { z } from "zod";

export const eventColors = [
  "#3498db",
  "#2ecc71",
  "#e67e22",
  "#9b59b6",
  "#e74c3c",
  "#FFFFFF",
  "#1abc9c",
];

export const EventInputSchema = z.object({
  title: z.string().min(3).max(300),
  description: z.string().optional(),
  date: z.string().min(6),
  color: z.string(),
  startTime: z.string().min(5),
  endTime: z.string().min(5),
});
