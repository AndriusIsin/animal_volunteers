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

function App() {
  const [valueDate, setValueDate] = useState({
    day: dayjs().format("DD"),
    month: dayjs().format("MMMM"),
    date: dayjs().toISOString(),
  });
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
          <InputForm valueDate={valueDate} />
        </Grid>
      </Grid>
      <Outlet />
      <AdminVue />
    </div>
  );
}
export default App;
