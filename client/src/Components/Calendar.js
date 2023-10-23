import * as React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

dayjs.extend(utc);





export default function Calendar({ setValueDate }) {
  const [value, setValue] = React.useState(dayjs(new Date()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={(newValue) => {
          const newValueAtMidnight = newValue.startOf("day").utc();
          setValue(newValueAtMidnight);
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
