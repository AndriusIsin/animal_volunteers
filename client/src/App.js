import "./App.css";
import * as React from "react";
import { useState } from "react";
import InputForm from "./Components/InputForm";
import MainBanner from "./Components/MainBanner";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import dayjs from "dayjs";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import AdminVue from "./Components/AdminVue";
import Calendar from "./Components/Calendar";
import { useEffect } from "react";
import loadingGif from "./images/loading.gif";

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
  const [updateMessage, setUpdateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatePage, setUpdatePage] = useState(false);

  useEffect(() => {
    fetch("https://animal-volunteers.onrender.com/sessions")
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(
            "Sorry, we are experiencing some problems with our server. Please try again later."
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
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
        console.error("Error fetching data:", error);
      });
  }, [
    valueDate.date,
    updateMessage,
    sessionNightBooked,
    sessionMorningBooked,
    updatePage,
  ]);

  console.log("allSessions", allSessions);

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
              xs: "100%", // Set width to 100% on extra small screens
              md: "90%", // Set width to 90% on medium screens and above
            },
          }}
        >
          <Grid item xs={12} md={5}>
            {" "}
            {/* Full width on extra small screens, half width on medium screens and above */}
            <Calendar setValueDate={setValueDate} />
          </Grid>
          <Grid item xs={12} md={7}>
            {" "}
            {/* Full width on extra small screens, half width on medium screens and above */}
            {loading && errorMessage === "" ? (
              <div>
                <img src={loadingGif} alt="Loading" style={{ width: "3rem" }} />
                <p>
                  Please wait until we load our service for you. It might take a
                  couple of minutes.
                </p>
              </div>
            ) : errorMessage !== "" ? (
              <p>{errorMessage}</p>
            ) : (
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
                deleteMessage={deleteMessage}
                setDeleteMessage={setDeleteMessage}
                setUpdatePage={setUpdatePage}
              />
            )}
          </Grid>
        </Grid>
        <Outlet />
        {errorMessage === "" && (
          <AdminVue
            deleteMessage={deleteMessage}
            setDeleteMessage={setDeleteMessage}
            allSessions={allSessions}
            valueDate={valueDate}
            updateMessage={updateMessage}
            setUpdateMessage={setUpdateMessage}
            setUpdatePage={setUpdatePage}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
