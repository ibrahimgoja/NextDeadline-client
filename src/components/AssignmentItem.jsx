const statusStyles = {
    "To Do": { color: "#6B7280", borderColor: "#6B7280" },
    "In Progress": { color: "#4f46e5", borderColor: "#4f46e5" },
    "Completed": { color: "#16a34a", borderColor: "#16a34a" },
}

const AssignmentItem = ({ title, course, due, status }) => {
    const style = statusStyles[status] || statusStyles["To Do"];

    return (
        <div className='assignment-item'>
            <div className='assignment-item-left'>
                <div className='assignment-title'>{title}</div>
                <div className='assignment-meta'>
                    <span className='assignment-course'>{course}</span>
                    <span className='assignment-dot'>•</span>
                    <span className='assignment-due'>Due {due}</span>
                </div>
            </div>
            <div className='assignment-status' style={{ color: style.color, borderColor: style.borderColor }}>
                {status}
            </div>
        </div>
    );
}

export default AssignmentItem;