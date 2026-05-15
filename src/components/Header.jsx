import { GraduationCap, LogOut } from "lucide-react";
import NavigationBar from "./Navigationbar";
import "../css/Header.css"

const Header = () => {
    return (
        <aside className="sidebar">
            <div className="header-top">
                <div className="header-top-icon">
                    <GraduationCap />
                </div>
                <div className="header-top-text">
                    <h1 className='app-name'>NextDeadLine</h1>
                    <h2 className="header-role">Student</h2>
                </div>
            </div>

            <NavigationBar />

            <div className="header-bot">
                <div className="header-user-info-container">
                    <div className="user-avatar-fallback">A</div>
                    <div className="header-user-details">
                        <div className="header-user-name">Alex Student</div>
                        <div className="header-user-email">student@demo.com</div>
                    </div>
                </div>

                <div className="logout-container">
                    <LogOut />
                    <div className="Logout-text">Logout</div>
                </div>
            </div>
        </aside>
    )
}

export default Header;