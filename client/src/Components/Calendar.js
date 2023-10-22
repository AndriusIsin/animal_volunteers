import * as React from "react";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendar({ setValueDate }) {
  const [value, setValue] = React.useState(dayjs(new Date()));
  console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setValueDate({
            day: newValue.format("DD"),
            month: newValue.format("MMMM"),
            date: newValue.toISOString(),
          });
        }}
      />
    </LocalizationProvider>
  );
}
