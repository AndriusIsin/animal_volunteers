import "./App.css";
import * as React from "react";
import { useState } from "react";
import InputForm from "./Components/InputForm";
import MainBanner from "./Components/MainBanner";
import { Grid, Typography } from "@mui/material";
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
    dateDb: dayjs().format("DD/MM/YYYY"),
    date: dayjs().toISOString(),
  });
  const [sessionNightBooked, setSessionNightBooked] = useState(false);
  const [sessionMorningBooked, setSessionMorningBooked] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://animal-server.onrender.com/sessions")
      .then((response) => response.json())
      .then((data) => {
        setAllSessions(data);
        setLoading(false);
        // After setting allSessions

        const isDayBookingExist = data.some((session) => {
          return (
            session.date === valueDate.dateDb && session.time === "morning"
          );
        });
        setSessionMorningBooked(isDayBookingExist);

        const isNightBookingExist = data.some((session) => {
          return (
            session.date === valueDate.dateDb && session.time === "evening"
          );
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
          {loading ? (
            <Typography
              variant="h1"
              sx={{
                animation: "blinker 1s linear infinite",
                textAlign: "center",
                color: "grey",
                fontWeight: "normal",
              }}
            >
              Loading.....
            </Typography>
          ) : (
            <InputForm
              allSessions={allSessions}
              setAllSessions={setAllSessions}
              valueDate={valueDate}
              sessionMorningBooked={sessionMorningBooked}
              sessionNightBooked={sessionNightBooked}
              setSessionMorningBooked={setSessionMorningBooked}
              setSessionNightBooked={setSessionNightBooked}
            />
          )}
        </Grid>
      </Grid>
      <Outlet />
      <AdminVue allSessions={allSessions} valueDate={valueDate} />
    </div>
  );
}
export default App;
