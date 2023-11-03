import "./App.css";
import * as React from "react";
import { useState } from "react";
import InputForm from "./Components/InputForm";
import MainBanner from "./Components/MainBanner";
import { Grid, ThemeProvider, createTheme, Typography } from "@mui/material";
import dayjs from "dayjs";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import AdminVue from "./Components/AdminVue";
import Calendar from "./Components/Calendar";
import { useEffect } from "react";
import Loading from "./Components/Loading";
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
  const [openFormNight, setOpenformNight] = useState(false);
  const [openFormDay, setOpenFormDay] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://animal-server.onrender.com/sessions")
      .then((response) => response.json())
      .then((data) => {
        setOpenformNight(false);
        setOpenFormDay(false);
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
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [valueDate.date]);

  const bootstrapTheme = createTheme({
    palette: {
      primary: {
        main: "#54626F",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={bootstrapTheme}>
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
          <Grid item xs={12} sm={12} md={5}>
            <Calendar setValueDate={setValueDate} />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            {error ? (
              <Typography
                variant="h6"
                sx={{ fontSize: "3rem", color: "#54626F" }}
              >
                {
                  // Improved error message for better client understanding
                  error === "Failed to fetch"
                    ? "Failed to retrieve data. Please check your internet connection and try again."
                    : "An unexpected error occurred. Please try again later."
                }
              </Typography>
            ) : !loading ? (
              <InputForm
                allSessions={allSessions}
                setAllSessions={setAllSessions}
                valueDate={valueDate}
                sessionMorningBooked={sessionMorningBooked}
                sessionNightBooked={sessionNightBooked}
                setSessionMorningBooked={setSessionMorningBooked}
                setSessionNightBooked={setSessionNightBooked}
                openFormNight={openFormNight}
                setOpenformNight={setOpenformNight}
                openFormDay={openFormDay}
                setOpenFormDay={setOpenFormDay}
              />
            ) : (
              <Loading />
            )}
          </Grid>
          <Outlet />
          <AdminVue
            allSessions={allSessions}
            setAllSessions={setAllSessions}
            valueDate={valueDate}
          />
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
