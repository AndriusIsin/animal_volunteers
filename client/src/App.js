import "./App.css";
import InputForm from "./Components/InputForm";
import MainBanner from "./Components/MainBanner";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <MainBanner />
      <Grid className="container" container mt="3rem" justifyContent="space-between" alignItems="center">
        <Grid item xs={5}>Calendar</Grid>
        <Grid item xs={7}>
          <InputForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
