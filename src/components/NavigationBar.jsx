import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Calendar, Bell, Settings, KanbanSquare } from "lucide-react";

const NavigationBar = () => {
    return (
        <>
            <nav className="Nav-container">
                <NavLink className="link-container" to="/Dashboard">
                    <LayoutDashboard />
                    Dashboard
                </NavLink>
                <NavLink className="link-container" to="/Semesters">
                    <FileText />
                    Semesters
                </NavLink>
                <NavLink className="link-container" to="/Calendar">
                    <Calendar />
                    Calendar
                </NavLink>
                <NavLink className="link-container" to="/KanbanBoard">
                    <KanbanSquare />
                    KanbanBoard
                </NavLink>
                <NavLink className="link-container" to="/Notifications">
                    <Bell />
                    Notifications
                    <span className="nav-badge">2</span>
                </NavLink>
                <NavLink className="link-container" to="/Settings">
                    <Settings />
                    Settings
                </NavLink>
            </nav>
        </>
    )
}

export default NavigationBar