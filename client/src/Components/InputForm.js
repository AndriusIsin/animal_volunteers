import { Button, Grid, Divider, Collapse } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./InputForm.css";
import { useState } from "react";
import Form from "./Form";


const bootstrapTheme = createTheme({
  palette: {
    primary: {
      main: "#54626F",
    },
    checkBox: {
      mail: "#228b22",
    },
  },
});

const InputForm = ({ valueDate, setAllSessions, sessionMorningBooked, sessionNightBooked }) => {
  const [openFormNight, setOpenformNight] = useState(false);
  const [openFormDay, setOpenFormDay] = useState(false);
  const [sessionTime, setSessionTime] = useState("night");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleBookClickNight = () => {
    setOpenformNight(true);
    setSessionTime("evening");
    setOpenFormDay(false);
    setDate(valueDate.date);
  };

  const handleBookClickDay = () => {
    setOpenFormDay(true);
    setSessionTime("morning");
    setOpenformNight(false);
    setDate(valueDate.date);
  };

  const handleCloseFormDay = () => {
    setOpenFormDay(false);
  };

  const handleCloseBookingFormNight = () => {
    setOpenformNight(false);
  };

  return (
    <div>
      <ThemeProvider theme={bootstrapTheme}>
        <div className="container-background">
          <Grid className="registration-form" container flexDirection="row">
            <Grid item xs={2} className="date-placeholder">
              <h2>{valueDate.day}</h2>
              <p>{valueDate.month}</p>
            </Grid>
            <Grid item xs={9} className="form-content">
              <div className="header-container">
                <div className="h2-day">
                  <h2>Day Sessions</h2>
                  {sessionMorningBooked && <CheckCircleIcon />}
                </div>
                {openFormDay ? (
                  <Button
                    color="primary"
                    variant="outlined"
                    className="cancel-button"
                    startIcon={<CancelIcon />}
                    onClick={handleCloseFormDay}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    className="Book-now"
                    disabled={sessionMorningBooked}
                    onClick={handleBookClickDay}
                  >
                    Book Day Session
                  </Button>
                )}
              </div>
              <Collapse in={openFormDay}>
                {successMessage !== "" ? <p>{successMessage}</p> : <p>To book your Day Session plese Fill in the form:</p>}
                <Form sessionTime={sessionTime} setSuccessMessage={setSuccessMessage} setAllSessions={setAllSessions} date={date} />
              </Collapse>
              <Divider variant="fullWidth" />
              <div className="header-container">
                <div className="h2-day">
                  <h2>Night Sessions</h2>
                  {sessionNightBooked && <CheckCircleIcon />}
                </div>
                {openFormNight ? (
                  <Button
                    color="primary"
                    variant="outlined"
                    className="cancel-button"
                    startIcon={<CancelIcon />}
                    onClick={handleCloseBookingFormNight}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    className="Book-now"
                    onClick={handleBookClickNight}
                    disabled={sessionNightBooked}
                  >
                    Book Night Session
                  </Button>
                )}
              </div>
              <Collapse in={openFormNight}>
                {successMessage !== "" ? <p>{successMessage}</p> : <p>To book your Night Session plese Fill in the form:</p>}
                <Form sessionTime={sessionTime} setSuccessMessage={setSuccessMessage} setAllSessions={setAllSessions} date={date} />
              </Collapse>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider >
    </div >
  );
};

export default InputForm;