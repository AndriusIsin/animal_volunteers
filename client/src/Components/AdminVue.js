import "./AdminVue.css";
import SearchBarForSessions from "./SearchBarForSessions";
import SessionInfoCard from "./SessionInfoCard";
import { useEffect, useState } from "react";

const AdminVue = ({ allSessions, valueDate, updateMessage, setUpdateMessage, deleteMessage, setDeleteMessage }) => {

  const [filteredSessions, setFilteredSessions] = useState(allSessions);
  const [delInfo, setDelInfo] = useState("");
  const clearMessage = () => {
    setUpdateMessage("");
  };

  //automatically clear the message after 5 seconds
  useEffect(() => {
    if (updateMessage) {
      const timer = setTimeout(clearMessage, 5000);
      return () => clearTimeout(timer);
    }
    console.log("delInfo", delInfo.message);
    console.log("deleteMessage", deleteMessage);
    setFilteredSessions(allSessions);
  }, [updateMessage, allSessions]);

  return (
    <div className="admin-wrapper">
      <div className="admin-vue">
        {updateMessage && (
          <p style={{ backgroundColor: "#9DC183", borderRadius: "6px", width: "20rem", display: "inline-block", padding: "1rem", color: "white" }}>Thank you! Information updated.</p>
        )}
        {deleteMessage && (
          <p style={{ display: "inline-block" }}>{delInfo}</p>
        )
        }
        <div className="container-for-search">
          <h3>Booked sessions</h3>
          <SearchBarForSessions allSessions={allSessions} setFilteredSessions={setFilteredSessions} />
        </div>
        <SessionInfoCard setDeleteMessage={setDeleteMessage} filteredSessions={filteredSessions} valueDate={valueDate} setUpdateMessage={setUpdateMessage} setDelInfo={setDelInfo} />
      </div>
    </div>
  );

};

export default AdminVue;
