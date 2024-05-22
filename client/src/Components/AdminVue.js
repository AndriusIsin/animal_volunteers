import "./AdminVue.css";
import SearchBarForSessions from "./SearchBarForSessions";
import SessionInfoCard from "./SessionInfoCard";
import { useEffect, useState } from "react";
import imageProcessing from "../images/2.gif";
import Grid from "@mui/material/Grid";


const AdminVue = ({
  setUpdatePage,
  allSessions,
  valueDate,
  updateMessage,
  setUpdateMessage,
  deleteMessage,
  setDeleteMessage,
}) => {
  const [filteredSessions, setFilteredSessions] = useState(allSessions);
  const clearMessage = () => {
    setUpdateMessage("");
  };

  //automatically clear the message after 5 seconds
  useEffect(() => {
    if (updateMessage) {
      const timer = setTimeout(clearMessage, 5000);
      return () => clearTimeout(timer);
    }
    setFilteredSessions(allSessions);
    setDeleteMessage("");
  }, [updateMessage, allSessions]);

  return (
    <div className="admin-wrapper">
      <div className="admin-vue">
        {updateMessage && (
          <Grid container direction="column" alignItems="center" sx={{ zIndex: 10, position: "absolute", borderRadius: "1rem", backgroundColor: "rgb(255, 255, 255, 0.8)", width: "45rem", border: "solid black 3px" }}>
            <Grid item>
              <img src={imageProcessing} alt="Image processing" style={{ width: "20rem" }} />
            </Grid>
            <Grid item sx={{ position: "absolute", pt: "9rem", textAlign: "center" }}>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "1.6rem",
                  color: "#FF5F0F",
                }}
              >
                Thank you! Information updating...
              </div>
            </Grid>
          </Grid>

        )}
        {deleteMessage && (
          <Grid container direction="column" alignItems="center" sx={{ zIndex: 10, position: "absolute", borderRadius: "1rem", backgroundColor: "rgb(255, 255, 255, 0.8)", width: "45rem", border: "solid black 3px" }}>
            <Grid item>
              <img src={imageProcessing} alt="Image processing" style={{ width: "20rem" }} />
            </Grid>
            <Grid item sx={{ position: "absolute", pt: "9rem", textAlign: "center" }}>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "1.6rem",
                  color: "#FF5F0F",
                }}
              >
                Information about this session deleting...
              </div>
            </Grid>
          </Grid>
        )}
        <div className="container-for-search">
          <h3>Booked sessions</h3>
          <SearchBarForSessions
            allSessions={allSessions}
            setFilteredSessions={setFilteredSessions}
          />
        </div>
        <SessionInfoCard
          filteredSessions={filteredSessions}
          valueDate={valueDate}
          setUpdateMessage={setUpdateMessage}
          setDeleteMessage={setDeleteMessage}
          setUpdatePage={setUpdatePage}
        />
      </div>
    </div >
  );
};

export default AdminVue;
