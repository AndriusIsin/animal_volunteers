import "./App.css";

import InputForm from "./Components/InputForm";
import MainBanner from "./Components/MainBanner";
import { Grid } from "@mui/material";

import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainBanner />
      <Grid className="container" container mt="3rem" justifyContent="space-between" alignItems="center" sx={{
        width: {
          xs: "98%",
          md: "90%",
        },
      }}>
        <Grid item xs={5}>Calendar</Grid>
        <Grid item xs={7}>
          <InputForm />
        </Grid>
      </Grid>
      <Outlet />
    </div>
  );
}
export default App;