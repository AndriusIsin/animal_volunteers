import "./SessionInfoCard.css";
import { Button, Card, Grid, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditWindowDemo from "./EditWindow";



const SessionInfoCard = ({ allSessions, setAllSessions }) => {

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
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={7} className="card-name">
              <Grid item justifyContent="flex-start">
                <p>{session.volunteer_name}</p>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <EditWindowDemo session={session} allSessions={allSessions} setAllSessions={setAllSessions} />
                <Button variant="outlined" sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }} color="primary" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </Grid>

            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
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
