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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const RadioButtonsGroup = ({ setTime, time }) => {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{ m: "0.5rem" }}>
                Session Type
            </FormLabel>
            <Grid container direction="row">
                <RadioGroup
                    sx={{ marginLeft: "0.5rem", marginBottom: "0.5rem" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="morning"
                    name="radio-buttons-group"
                    value={time}
                    onChange={(e) => {
                        e.target.value === "morning" && setTime("morning");
                        e.target.value === "evening" && setTime("evening");
                    }}
                >
                    <FormControlLabel value="morning" control={<Radio />} label="Morning" />
                    <FormControlLabel value="evening" control={<Radio />} label="Evening" />
                </RadioGroup>
            </Grid>
        </FormControl>
    );
};

const EditWindow = ({ editWindowOpen, setEditWindowOpen, session, setUpdateMessage }) => {
    console.log("session", session);
    const [name, setName] = useState(session.name);
    const [phone, setPhone] = useState(session.phone);
    const [email, setEmail] = useState(session.email);
    const [time, setTime] = useState(session.time);
    const [date, setDate] = useState("");

    const id = session.volunteers_id;

    const handleClose = () => {
        setEditWindowOpen(false);
    };

    async function handleSaveButton() {

        const editedSessionAndVolunteer = {
            Name: name,
            Phone: phone,
            Email: email,
            Time: time,
            Date: date,
        };

        try {
            const response = await fetch(`https://animal-server.onrender.com/volunteers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedSessionAndVolunteer),
            });

            if (!response.ok) {
                console.log(response);
            } else {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error("Error:", error);
        }

        setEditWindowOpen(false);
        setUpdateMessage(true);

        console.log(editedSessionAndVolunteer);
    }


    return (
        <Dialog open={editWindowOpen} onClose={handleClose} sx={{ backgroundColor: "rgba(21, 20, 19, 0.4)" }}>
            <DialogTitle sx={{ marginLeft: "1rem" }}>Set New Volunteer or Session</DialogTitle>
            <Grid container direction="column" justifyContent="flex-start" sx={{ m: "2rem", mt: "0rem" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        onChange={(newDate) => setDate(newDate)}
                        disablePast
                        sx={{ m: "0.5rem", width: "15rem" }}
                        required
                    />
                </LocalizationProvider>

                <RadioButtonsGroup time={time} setTime={setTime} />
                <TextField
                    required
                    id="outlined-required"
                    label="Volunteer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={session.volunteer_name}
                    sx={{ m: "0.5rem", width: "20rem" }}
                />

                <TextField
                    required
                    id="outlined-phone-input"
                    label="Phone Number"
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ m: "0.5rem", width: "20rem" }}
                />
                <TextField
                    required
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ m: "0.5rem", width: "20rem" }}
                />
                <Grid container display="row" justifyContent="flex-end" sx={{ width: " 82%", mt: "1rem" }}>
                    <Button variant="outlined" sx={{ width: "5rem", marginRight: "1rem" }} onClick={(e) => handleSaveButton(e)}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={handleClose} sx={{ width: "5rem" }}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};

const EditWindowDemo = ({ session, filteredSessions, setUpdateMessage }) => {
    const [editWindowOpen, setEditWindowOpen] = useState(false);

    const handleClickOpen = () => {
        setEditWindowOpen(true);
        setUpdateMessage(false);
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
                filteredSessions={filteredSessions}
                setUpdateMessage={setUpdateMessage}
            />
        </div>
    );
};
export default EditWindowDemo;
