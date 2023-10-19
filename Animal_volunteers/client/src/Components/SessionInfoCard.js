import "./SessionInfoCard.css";
import { Card, Grid } from "@mui/material";

const SessionInfoCard = () => {
    return (
        <div>
            <Card variant="outlined">
                <Grid container className="info-card" direction="row">
                    <Grid item xs={2}>
                        <div className="card-date">28/12/2023</div>
                    </Grid>
                    <Grid item xs={8} className="card-name">
                        <p>Name</p>
                        <button>Edit</button>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="session-type">Night Session</div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default SessionInfoCard;