import "./SessionInfoCard.css";
import { Button, Card, Grid, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditWindowDemo from "./EditWindow";



const SessionInfoCard = ({ setUpdateMessage, filteredSessions, setDeleteMessage, setDelInfo }) => {
  console.log("filteredSessons", filteredSessions);
  const handleDeleteClick = (volID) => {
    fetch(`https://animal-server.onrender.com/volunteers/${volID}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Failed to delete session (Status: ${res.status})`);
          throw new Error(`Failed to delete session (Status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("When Message del", data);
        setDelInfo(data);
        setDeleteMessage(true);

      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });

  };

  return (
    <div>
      {filteredSessions && filteredSessions.length > 0 ? filteredSessions.map((session, index) => (
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
                <EditWindowDemo session={session} filteredSessions={filteredSessions} setUpdateMessage={setUpdateMessage} />
                <Button variant="outlined" sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }} color="primary" startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(session.volunteers_id)}>
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

      )) : (<p>No sessions</p>)}
    </div>
  );
};

export default SessionInfoCard;
