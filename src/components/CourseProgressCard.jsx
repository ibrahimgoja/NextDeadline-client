const CourseProgressCard = ({ code, name, completed, total, color }) => {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className='course-progress-card'>
            <div className='course-progress-card-header'>
                <span className='course-dot' style={{ background: color }}></span>
                <div>
                    <div className='course-code'>{code}</div>
                    <div className='course-name'>{name}</div>
                </div>
            </div>
            <div className='course-progress-bar-row'>
                <span>Progress</span>
                <span>{completed} / {total}</span>
            </div>
            <div className='course-progress-bar-bg'>
                <div className='course-progress-bar-fill' style={{ width: `${percentage}%` }}></div>
            </div>
            <div className='course-percentage'>{percentage}% Complete</div>
        </div>
    );
}

export default CourseProgressCard;