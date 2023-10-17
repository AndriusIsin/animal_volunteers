import "./App.css";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
    <MainBanner />
      <Grid className="container" container mt="3rem" justifyContent="space-between" alignItems="center">
        <Grid item xs={5}>Hello</Grid>
        <Grid item xs={7}>Hello1</Grid>
      </Grid>
      <Outlet />
    </div>
  );
}
export default App;
