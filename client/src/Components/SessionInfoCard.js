import "./SessionInfoCard.css";
import { Button, Card, Grid } from "@mui/material";

const SessionInfoCard = ({ allSessions }) => {
  return (
    <div>
      {allSessions.map((session, index) => (
        <Card variant="outlined" key={index} className="info-card">
          <Grid
            container
            direction="row"
            className={session.time === "evening" ? "background-gray" : "card"}
          >
            <Grid item xs={2}>
              <div>{session.date.split("T")[0]}</div>
            </Grid>
            <Grid item xs={8} className="card-name">
              <p>{session.volunteer_name}</p>
              <Button variant="outlined">Edit</Button>
            </Grid>
            <Grid item xs={2}>
              <div>{session.time}</div>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
};

export default SessionInfoCard;
