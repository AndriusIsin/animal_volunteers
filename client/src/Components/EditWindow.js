import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button, Dialog, DialogTitle, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioButtonsGroup = () => {
    return (
        <FormControl >
            <FormLabel id="demo-radio-buttons-group-label" sx={{ m: "0.5rem" }} >Session Type</FormLabel>
            <RadioGroup
                sx={{ marginLeft: "0.5rem", marginBottom: "0.5rem" }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Morning Session"
                name="radio-buttons-group"
            >
                <Grid container direction="row">
                    <FormControlLabel value="Morning Session" control={<Radio />} label="Morning" />
                    <FormControlLabel value="Evening Session" control={<Radio />} label="Evening" />
                </Grid>

            </RadioGroup>
        </FormControl>
    );
};

const EditWindow = ({ editWindowOpen, setEditWindowOpen, session }) => {
    const handleClose = () => {
        setEditWindowOpen(false);
    };

    return (
        <Dialog open={editWindowOpen} onClose={handleClose} sx={{ backgroundColor: "rgba(	21, 20, 19, 0.4)" }}>
            <DialogTitle sx={{ marginLeft: "1rem" }}>Set New Volunteer or Session</DialogTitle>
            <Grid container direction="column" justifyContent="flex-start" sx={{ m: "2rem", mt: "0rem" }}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker disablePast sx={{ m: "0.5rem", width: "15rem" }} />
                </LocalizationProvider>
                <RadioButtonsGroup />
                <TextField
                    id="outlined-required"
                    label="Volunteer Name"
                    defaultValue={session.volunteer_name}
                    sx={{ m: "0.5rem", width: "20rem" }}
                />

                <TextField
                    id="outlined-phone-input"
                    label="Phone Number"
                    type="phone"
                    sx={{ m: "0.5rem", width: "20rem" }}
                />
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    sx={{ m: "0.5rem", width: "20rem" }}
                />
                <Grid container display="row" justifyContent="flex-end" sx={{ width: " 82%", mt: "1rem" }}>
                    <Button variant="outlined" sx={{ width: "5rem", marginRight: "1rem" }}>Save</Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ width: "5rem" }}>Cancel</Button>
                </Grid>
            </Grid>


        </Dialog>
    );
};

export default function EditWindowDemo({ session }) {
    const [editWindowOpen, setEditWindowOpen] = useState(false);

    const handleClickOpen = () => {
        setEditWindowOpen(true);
    };

    return (
        <div>
            <Button
                variant="outlined"
                sx={{ backgroundColor: "rgba(74, 89, 99, 0.4)", marginRight: "1rem" }}
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Edit
            </Button>
            <EditWindow
                session={session}
                editWindowOpen={editWindowOpen}
                setEditWindowOpen={setEditWindowOpen}
            />
        </div>
    );
}
