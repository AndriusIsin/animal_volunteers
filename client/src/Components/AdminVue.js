import "./AdminVue.css";
import SessionInfoCard from "./SessionInfoCard";

const AdminVue = ({ allSessions, valueDate }) => {
  return (
    <div className="admin-wrapper">
      <div className="admin-vue">
        {Array.isArray(allSessions) ? (
          <SessionInfoCard allSessions={allSessions} valueDate={valueDate} />
        ) : (
          <p>Invalid session data</p>
        )}
      </div>
    </div>
  );
};

export default AdminVue;
