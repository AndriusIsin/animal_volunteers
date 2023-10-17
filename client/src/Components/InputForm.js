import { Button, Grid, Divider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./InputForm.css";


const bootstrapTheme = createTheme({
    palette: {
        primary: {
            main: "#54626F",
        },
    },
});

const Form = () => {
    return (
        <form className="form-inputs">
            <input placeholder="Enter Your FullName"></input>
            <br></br>
            <input placeholder="Enter your Phone Number"></input>
            <span>
                <input placeholder="Enter your email address"></input>
            </span>
            <br></br>
            <Button variant="contained" >Submit</Button>
        </form>
    );
};

const InputForm = () => {
    return (
        <div>InputForm
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
                                <Button color="primary" variant="outlined" className="cancel-button" startIcon={<CancelIcon />}>Cancel</Button>
                            </div>


                            <p>To book your Day Session plese Fill in the form:</p>
                            <Form />
                            <Divider variant="middle" />
                            <h3>Night Sessions</h3>
                            <p>To book your Night Session plese Fill in the form:</p>
                            <Form />
                        </Grid>

                    </Grid>
                </div>
            </ThemeProvider>
        </div>);
};

export default InputForm;