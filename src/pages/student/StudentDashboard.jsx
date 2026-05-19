import React from 'react';
import { BookOpen, CheckCircle, Clock, AlertTriangle, Calendar, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import CourseProgressCard from '../../components/CourseProgressCard';
import AssignmentItem from '../../components/AssignmentItem';
import '../../css/StudentDashboard.css';

const courses = [
    { code: "CS101", name: "Introduction to Computer Science", completed: 1, total: 2, color: "#3B82F6" },
    { code: "CS201", name: "Data Structures and Algorithms", completed: 0, total: 2, color: "#8B5CF6" },
    { code: "CS301", name: "Web Development", completed: 0, total: 1, color: "#10B981" },
];

const assignments = [
    { title: "Binary Search Tree", course: "CS201", due: "Apr 28", status: "To Do" },
    { title: "Variables and Data Types", course: "CS101", due: "Apr 25", status: "In Progress" },
    { title: "Linked List Implementation", course: "CS201", due: "Apr 22", status: "To Do" },
    { title: "Hello World Program", course: "CS101", due: "Apr 20", status: "Completed" },
    { title: "React Component Design", course: "CS301", due: "Apr 24", status: "To Do" },
];

const deadlines = [];

const StudentDashboard = ({ UserName }) => {
    return (
        <div className='dashboard'>

            {/* Greeting */}
            <div className='dashboard-greeting-container'>
                <h1>Welcome back, {UserName} 👋</h1>
                <div className='greeting-subText'>Here's your academic overview</div>
            </div>

            {/* Stat Cards */}
            <div className='stat-cards-container'>
                <StatCard title="Total Assignments" value={5} icon={BookOpen} color="linear-gradient(135deg, #3B82F6, #2563EB)" />
                <StatCard title="Completed" value={1} icon={CheckCircle} color="linear-gradient(135deg, #22C55E, #16A34A)" />
                <StatCard title="Upcoming" value={0} icon={Clock} color="linear-gradient(135deg, #F97316, #EA580C)" />
                <StatCard title="Overdue" value={4} icon={AlertTriangle} color="linear-gradient(135deg, #EC4899, #DB2777)" />
            </div>

            {/* Deadlines + Overall Progress */}
            <div className='deadlines-overall-container'>

                <div className='deadlines-card'>
                    <div className='deadlines-card-header'>
                        <span className='deadlines-title'>Upcoming Deadlines</span>
                        <Link to="/Student/Calendar" className='view-calendar-btn'>
                            <Calendar size={16} />
                            View Calendar
                        </Link>
                    </div>

                    {deadlines.length === 0 ? (
                        <div className='deadlines-empty'>
                            <Clock size={40} color="#9CA3AF" />
                            <p>No upcoming deadlines in the next 7 days</p>
                        </div>
                    ) : (
                        <div className='deadlines-list'>
                            {deadlines.map((deadline, index) => (
                                <div className='deadline-item' key={index}>
                                    <div className='deadline-item-left'>
                                        <div className='deadline-item-title'>{deadline.title}</div>
                                        <div className='deadline-item-meta'>
                                            <span className='deadline-course-badge'>{deadline.course}</span>
                                            <span>•</span>
                                            <span>Due {deadline.due}</span>
                                        </div>
                                    </div>
                                    <div className='assignment-status' style={{ color: "#F97316", borderColor: "#F97316" }}>
                                        Upcoming
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='overall-progress-card'>
                    <div className='overall-progress-title'>Overall Progress</div>
                    <div className='overall-progress-percentage'>20%</div>
                    <div className='overall-progress-label'>Completion Rate</div>

                    <div className='progress-row'>
                        <div className='progress-row-header'>
                            <span>Completed</span>
                            <span>1 / 5</span>
                        </div>
                        <div className='progress-bar-bg'>
                            <div className='progress-bar-fill' style={{ width: "20%" }}></div>
                        </div>
                    </div>

                    <div className='progress-row'>
                        <div className='progress-row-header'>
                            <span>Tasks Completed</span>
                            <span>2 / 3</span>
                        </div>
                        <div className='progress-bar-bg'>
                            <div className='progress-bar-fill' style={{ width: "66%" }}></div>
                        </div>
                    </div>

                    <Link to="/Student/KanbanBoard" className='view-kanban-btn'>
                        View Kanban Board
                    </Link>
                </div>
            </div>

            {/* Course Progress */}
            <div className='course-progress-section'>
                <div className='section-title'>Course Progress</div>
                {courses.length === 0 ? (
                    <div className='assignments-empty'>
                        <ClipboardList size={36} color="#9CA3AF" />
                        <p>No courses enrolled yet</p>
                    </div>
                ) : (
                    <div className='course-progress-container'>
                        {courses.map((course) => (
                            <Link to={`/Student/Semesters/${course.code}`} key={course.code} className='course-card-link'>
                                <CourseProgressCard {...course} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Assignments */}
            <div className='recent-assignments-section'>
                <div className='section-title'>Recent Assignments</div>
                {assignments.length === 0 ? (
                    <div className='assignments-empty'>
                        <ClipboardList size={36} color="#9CA3AF" />
                        <p>No assignments yet</p>
                    </div>
                ) : (
                    <div className='assignments-list'>
                        {assignments.map((assignment, index) => (
                            <Link to={`/Student/Semesters/${assignment.course}`} key={index} className='assignment-link'>
                                <AssignmentItem {...assignment} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default StudentDashboard;