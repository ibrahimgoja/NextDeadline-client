import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { isAfter, isBefore, addDays, matchId } from '../../components/dateUtils';
import DashboardGreeting from '../../components/DashboardGreeting';
import StatCards from '../../components/StatCards';
import UpcomingDeadlines from '../../components/UpcomingDeadlines';
import OverallProgress from '../../components/OverallProgress';
import CourseProgressSection from '../../components/CourseProgressSection';
import RecentAssignments from '../../components/RecentAssignments';
import '../../css/StudentDashboard.css';

export default function StudentDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentProgress, setAssignmentProgress] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskProgress, setTaskProgress] = useState([]);

  const fetchData = async () => {
    const res = await fetch('/api/data', {
      headers: { 'X-User-Id': String(user.id) },
    });
    const data = await res.json();
    setCourses(data.courses);
    setAssignments(data.assignments);
    setAssignmentProgress(data.assignmentProgress);
    setEnrollments(data.enrollments);
    setTasks(data.tasks);
    setTaskProgress(data.taskProgress);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    statCards,
    upcomingDeadlines,
    completionRate,
    completed,
    total,
    completedTasks,
    allTasks,
    courseProgress,
    recentAssignments,
  } = useMemo(() => {
    const enrolledCourses = enrollments
      .filter((e) => matchId(e.studentId, user.id))
      .map((e) => courses.find((c) => matchId(c.id, e.courseId)))
      .filter(Boolean);

    const courseIds = enrolledCourses.map((c) => c.id);
    const myAssignments = assignments.filter((a) => courseIds.includes(a.courseId));

    const assignmentStatuses = myAssignments.map((a) => ({
      assignment: a,
      status: assignmentProgress.find((ap) => matchId(ap.assignmentId, a.id) && matchId(ap.studentId, user.id))?.status || 'To Do',
      course: courses.find((c) => matchId(c.id, a.courseId)),
    }));

    const now = new Date();
    const totalCount = assignmentStatuses.length;
    const completedCount = assignmentStatuses.filter((a) => a.status === 'Completed').length;
    const upcoming = assignmentStatuses.filter(
      (a) => a.status !== 'Completed' && isAfter(new Date(a.assignment.dueDate), now) && isBefore(new Date(a.assignment.dueDate), addDays(now, 7)),
    );
    const allTasksList = tasks.filter((t) => myAssignments.some((a) => matchId(a.id, t.assignmentId)));
    const completedTasksCount = allTasksList.filter((t) =>
      taskProgress.some((tp) => matchId(tp.taskId, t.id) && matchId(tp.studentId, user.id) && tp.completed),
    ).length;
    const completionRateValue = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      statCards: [
        { label: 'Total Assignments', value: totalCount, icon: BookOpen, bg: 'linear-gradient(135deg,#3b82f6,#2563eb)' },
        { label: 'Completed', value: completedCount, icon: CheckCircle2, bg: 'linear-gradient(135deg,#22c55e,#16a34a)' },
        { label: 'Upcoming', value: upcoming.length, icon: Clock, bg: 'linear-gradient(135deg,#f59e0b,#ea580c)' },
        { label: 'Overdue', value: assignmentStatuses.filter((a) => a.status !== 'Completed' && isBefore(new Date(a.assignment.dueDate), now)).length, icon: AlertTriangle, bg: 'linear-gradient(135deg,#f43f5e,#e11d48)' },
      ],
      upcomingDeadlines: [...upcoming].sort((a, b) => new Date(a.assignment.dueDate) - new Date(b.assignment.dueDate)).slice(0, 5),
      completionRate: completionRateValue,
      completed: completedCount,
      total: totalCount,
      completedTasks: completedTasksCount,
      allTasks: allTasksList,
      courseProgress: enrolledCourses.map((course) => {
        const ca = assignmentStatuses.filter((a) => matchId(a.course?.id, course.id));
        const done = ca.filter((a) => a.status === 'Completed').length;
        return { course, completed: done, total: ca.length, progress: ca.length > 0 ? Math.round((done / ca.length) * 100) : 0 };
      }),
      recentAssignments: [...assignmentStatuses]
        .sort((a, b) => new Date(b.assignment.createdAt || b.assignment.dueDate) - new Date(a.assignment.createdAt || a.assignment.dueDate))
        .slice(0, 5),
    };
  }, [user, courses, assignments, assignmentProgress, enrollments, tasks, taskProgress]);

  return (
    <div className="dashboard figma-page">
      <DashboardGreeting name={user.name} />
      <StatCards statCards={statCards} />
      <div className="deadlines-overall-container">
        <UpcomingDeadlines items={upcomingDeadlines} />
        <OverallProgress
          completionRate={completionRate}
          completed={completed}
          total={total}
          completedTasks={completedTasks}
          allTasksCount={allTasks.length}
        />
      </div>
      <CourseProgressSection courseProgress={courseProgress} />
      <RecentAssignments items={recentAssignments} />
    </div>
  );
}
