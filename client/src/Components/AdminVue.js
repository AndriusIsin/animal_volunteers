import "./AdminVue.css";
import SessionInfoCard from "./SessionInfoCard";

const AdminVue = ({ allSessions }) => {
    return (
        <div className="admin-wrapper">
            <div className="admin-vue">
                <SessionInfoCard allSessions={allSessions} />
            </div>

        </div>);
};

export default AdminVue;