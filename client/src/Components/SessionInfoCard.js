import "./SessionInfoCard.css";
import { Button, Card, Grid, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={7} className="card-name">
              <p>{session.volunteer_name}</p>
              <div>
                <Button variant="outlined" sx={{ backgroundColor: "rgba(74, 89, 99, 0.4)", marginRight: "1rem" }} color="secondary" startIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button variant="outlined" sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }} color="primary" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>

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
