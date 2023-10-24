import "./AdminVue.css";
import SearchBarForSessions from "./SearchBarForSessions";
import SessionInfoCard from "./SessionInfoCard";
// import { useState } from "react";

const AdminVue = ({ allSessions, valueDate }) => {

  return (
    <div className="admin-wrapper">
      <div className="admin-vue">
        <div className="container-for-search">
          <h3>Booked sessions</h3>
          <SearchBarForSessions allSessions={allSessions} />
        </div>
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
