import { Button, Grid, Divider, Collapse } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./InputForm.css";
import { useState } from "react";
import Form from "./Form";

const bootstrapTheme = createTheme({
    palette: {
        primary: {
            main: "#54626F",
        },
    },
});

const InputForm = () => {
    const [openFormNight, setOpenformNight] = useState(false);
    const [openFormDay, setOpenFormDay] = useState(false);
    const [sessionType, setSessionType] = useState("night");

    const handleBookClickNight = () => {
        setOpenformNight(true);
        setSessionType("night");
    };

    const handleBookClickDay = () => {
        setOpenFormDay(true);
        setSessionType("day");
    };

    const handleCloseFormDay = () => {
        setOpenFormDay(false);
    };

    const handleCloseBookingFormNight = () => {
        setOpenformNight(false);
    };
    return (
        <div>
            <ThemeProvider
                theme={bootstrapTheme}
            ><div className="container-background">
                    <Grid className="registration-form" container flexDirection="row" >

                        <Grid item xs={2} className="date-placeholder">
                            <h2>17</h2>
                            <p>November</p>
                        </Grid>
                        <Grid item xs={9} className="form-content">
                            <div className="header-container">
                                <h2>Day Sessions</h2>
                                {
                                    openFormDay ? <Button color="primary" variant="outlined" className="cancel-button" startIcon={<CancelIcon />} onClick={handleCloseFormDay}>Cancel</Button>
                                        : <Button color="primary" variant="contained" className="Book-now" onClick={handleBookClickDay}>Book Day Session</Button>

                                }
                            </div>
                            <Collapse in={openFormDay}>
                                <p>To book your Day Session plese Fill in the form:</p>
                                <Form sessionType={sessionType} />
                            </Collapse>
                            <Divider variant="fullWidth" />
                            <div className="header-container">
                                <h2>Night Sessions</h2>
                                {openFormNight ? <Button color="primary" variant="outlined" className="cancel-button" startIcon={<CancelIcon />} onClick={handleCloseBookingFormNight}>Cancel</Button>
                                    : <Button color="primary" variant="contained" className="Book-now" onClick={handleBookClickNight}>Book Night Session</Button>
                                }
                            </div>
                            <Collapse in={openFormNight}>
                                <p>To book your Night Session plese Fill in the form:</p>
                                <Form sessionType={sessionType} />
                            </Collapse>

                        </Grid>

                    </Grid>
                </div>
            </ThemeProvider>
        </div>);
};

export default InputForm;