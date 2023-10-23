import "./AdminVue.css";
import SessionInfoCard from "./SessionInfoCard";

const AdminVue = ({ allSessions, valueDate }) => {
    return (
        <div className="admin-wrapper">
            <div className="admin-vue">
                <SessionInfoCard allSessions={allSessions} valueDate={valueDate} />
            </div>

        </div>);
};

export default AdminVue;