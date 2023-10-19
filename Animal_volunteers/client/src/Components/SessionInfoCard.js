import { useEffect, useState } from "react";
import "./SessionInfoCard.css";
import { Button, Card, Grid } from "@mui/material";

const SessionInfoCard = () => {
    const [allSessions, setAllSessions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/sessions")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setAllSessions(data);
            });
    }, []);
    return (
        <div>
            {allSessions.map((session, index) => (
                <Card variant="outlined" key={index} className="info-card">
                    <Grid container direction="row" className={session.Time === "evening" ? "background-gray" : "card"} >
                        <Grid item xs={2}>
                            <div>{session.date}</div>
                        </Grid>
                        <Grid item xs={8} className="card-name">
                            <p>{session.volunteer_name}</p>
                            <Button variant="outlined">Edit</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <div >{session.time}</div>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </div>
    );
};

export default SessionInfoCard;