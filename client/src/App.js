import "./App.css";
import MainBanner from "./Components/MainBanner";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <MainBanner />
      <Grid className="container" container mt="3rem" justifyContent="space-between" alignItems="center">
        <Grid item xs={5}>Hello</Grid>
        <Grid item xs={7}>Hello1</Grid>
      </Grid>
    </div>
  );
}

export default App;
