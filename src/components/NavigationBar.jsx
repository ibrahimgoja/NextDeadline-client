import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Calendar, Settings, KanbanSquare, BookOpen, Users, ClipboardList } from "lucide-react";

const NavigationBar = ({Role}) => {
    const studnetLinks = [
        { to: "/Student/Dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/Student/Semesters", label: "Semesters", icon: FileText },
        { to: "/Student/Calendar", label: "Calendar", icon: Calendar },
        { to: "/Student/KanbanBoard", label: "Kanban Board", icon: KanbanSquare },
        { to: "/Student/Settings", label: "Settings", icon: Settings },
    ];
    const instructorLinks = [
        { to: "/Instructor/Dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/Instructor/Courses", label: "Courses", icon: BookOpen },
        { to: "/Instructor/Students", label: "Students", icon: Users },
        { to: "/Instructor/Grades", label: "Grades", icon: ClipboardList },
        { to: "/Instructor/Settings", label: "Settings", icon: Settings },
    ];

    const Links = Role == "Student" ? studnetLinks : instructorLinks;
    return (
        <>
            <nav className="Nav-container">
                {Links.map((Link) => (
                    
                        <NavLink className="link-container" to={Link.to} key={Link.to}>
                            <Link.icon />
                            {Link.label}
                        </NavLink>
                ))}
            </nav>
        </>
    )

}

export default NavigationBar