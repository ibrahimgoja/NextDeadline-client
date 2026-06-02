export default function CourseChip({ course }) {
  if (!course) return null;
  return (
    <span className="course-chip" style={{ background: `${course.color}20`, color: course.color }}>
      {course.code}
    </span>
  );
}
