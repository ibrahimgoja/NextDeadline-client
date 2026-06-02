import { useMemo, useState } from 'react';
import InstructorStatCards from '../../components/InstructorStatCards';
import InstructorUpcomingDeadlines from '../../components/InstructorUpcomingDeadlines';
import InstructorRecentAssignments from '../../components/InstructorRecentAssignments';
import InstructorMyCourses from '../../components/InstructorMyCourses';
import { isAfter, isBefore, addDays, matchId } from '../../components/dateUtils';
import '../../css/StudentDashboard.css';

export default function InstructorDashboard({ user }) {
  const [courses] = useState([]);
  const [assignments] = useState([]);
  const [assignmentProgress] = useState([]);
  const [enrollments] = useState([]);

  const { stats, upcomingDeadlines, recentAssignments, courseStats } = useMemo(() => {
    const myCourses = courses.filter((c) => matchId(c.instructorId, user?.id));
    const myCourseIds = myCourses.map((c) => c.id);
    const myAssignments = assignments.filter((a) => myCourseIds.includes(a.courseId));
    const now = new Date();

    const upcomingList = myAssignments.filter(
      (a) => isAfter(new Date(a.dueDate), now) && isBefore(new Date(a.dueDate), addDays(now, 7)),
    );

    const totalStudents = new Set(
      enrollments.filter((e) => myCourses.some((c) => matchId(c.id, e.courseId))).map((e) => e.studentId),
    ).size;

    let totalCompletion = 0;
    let completionCount = 0;
    myAssignments.forEach((a) => {
      const recs = assignmentProgress.filter((ap) => matchId(ap.assignmentId, a.id));
      if (recs.length) {
        totalCompletion += (recs.filter((r) => r.status === 'Completed').length / recs.length) * 100;
        completionCount++;
      }
    });

    return {
      stats: {
        activeCourses: myCourses.length,
        totalAssignments: myAssignments.length,
        totalStudents,
        avgCompletion: completionCount > 0 ? Math.round(totalCompletion / completionCount) : 0,
      },
      upcomingDeadlines: [...upcomingList].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).slice(0, 5),
      recentAssignments: [...myAssignments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
      courseStats: myCourses.map((course) => {
        const courseAssignments = myAssignments.filter((a) => matchId(a.courseId, course.id));
        const studentCount = enrollments.filter((e) => matchId(e.courseId, course.id)).length;
        let tc = 0;
        let ac = 0;
        courseAssignments.forEach((assignment) => {
          const recs = assignmentProgress.filter((ap) => matchId(ap.assignmentId, assignment.id));
          if (recs.length) {
            tc += (recs.filter((r) => r.status === 'Completed').length / recs.length) * 100;
            ac++;
          }
        });
        return {
          course,
          assignmentCount: courseAssignments.length,
          studentCount,
          avgCompletion: ac > 0 ? Math.round(tc / ac) : 0,
        };
      }),
    };
  }, [user, courses, assignments, assignmentProgress, enrollments]);

  return (
    <div className="dashboard figma-page">
      <div className="dashboard-greeting-container">
        <h1>Instructor Dashboard</h1>
        <div className="greeting-subText">Manage your courses and track student progress</div>
      </div>
      <InstructorStatCards stats={stats} />
      <div className="deadlines-overall-container">
        <InstructorUpcomingDeadlines courses={courses} items={upcomingDeadlines} />
        <InstructorRecentAssignments
          assignments={recentAssignments}
          courses={courses}
          assignmentProgress={assignmentProgress}
          items={recentAssignments}
        />
      </div>
      <InstructorMyCourses courseStats={courseStats} />
    </div>
  );
}
