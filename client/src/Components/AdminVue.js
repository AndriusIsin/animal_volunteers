import "./AdminVue.css";
import SearchBarForSessions from "./SearchBarForSessions";
import SessionInfoCard from "./SessionInfoCard";
import { useEffect } from "react";

const AdminVue = ({ allSessions, valueDate, setAllSessions, updateMessage, setUpdateMessage }) => {
  const clearMessage = () => {
    setUpdateMessage("");
  };

  //automatically clear the message after 5 seconds
  useEffect(() => {
    if (updateMessage) {
      const timer = setTimeout(clearMessage, 5000);
      return () => clearTimeout(timer);
    }
  }, [updateMessage]);

  return (
    <div className="admin-wrapper">
      <div className="admin-vue">
        {updateMessage && <p>Thank you! Information updated.</p>}
        <div className="container-for-search">
          <h3>Booked sessions</h3>
          <SearchBarForSessions allSessions={allSessions} />
        </div>
        {Array.isArray(allSessions) ? (
          <SessionInfoCard allSessions={allSessions} setAllSessions={setAllSessions} valueDate={valueDate}
            setUpdateMessage={setUpdateMessage} />
        ) : (
          <p>Invalid session data</p>
        )}
      </div>
    </div>
  );
};

export default AdminVue;
