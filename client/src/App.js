import "./App.css";
import * as React from "react";
import { useState } from "react";
import InputForm from "./Components/InputForm";
import MainBanner from "./Components/MainBanner";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import AdminVue from "./Components/AdminVue";
import Calendar from "./Components/Calendar";
import { useEffect } from "react";

function App() {
  const [valueDate, setValueDate] = useState({
    day: dayjs().format("DD"),
    month: dayjs().format("MMMM"),
    date: dayjs().toISOString(),
  });
  const [sessionNightBooked, setSessionNightBooked] = useState(false);
  const [sessionMorningBooked, setSessionMorningBooked] = useState(false);
  const [allSessions, setAllSessions] = useState([]);

  useEffect(() => {
    fetch("https://animal-server.onrender.com/sessions")
      .then((response) => response.json())
      .then((data) => {
        setAllSessions(data);

        // After setting allSessions, check for existing bookings
        const isDayBookingExist = allSessions.some((session) => {
          console.log("Date From Database----->", session.date);
          console.log("Date From Calendar----->", valueDate.date);
          return session.date === valueDate.date && session.time === "morning";
        });
        setSessionMorningBooked(isDayBookingExist);

        const isNightBookingExist = allSessions.some((session) => {
          return session.date === valueDate.date && session.time === "evening";
        });
        setSessionNightBooked(isNightBookingExist);
      });
  }, [valueDate.date]);

  return (
    <div className="App">
      <Navbar />
      <MainBanner />
      <Grid
        className="container"
        container
        mt="3rem"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: {
            xs: "98%",
            md: "90%",
          },
        }}
      >
        <Grid item xs={5}>
          <Calendar setValueDate={setValueDate} />
        </Grid>
        <Grid item xs={7}>
          <InputForm allSessions={allSessions} setAllSessions={setAllSessions} valueDate={valueDate} sessionMorningBooked={sessionMorningBooked} sessionNightBooked={sessionNightBooked} />
        </Grid>
      </Grid>
      <Outlet />
      <AdminVue allSessions={allSessions} />
    </div>
  );
}
export default App;
