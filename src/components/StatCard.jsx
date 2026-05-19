import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <div className='stat-card' style={{ background: color }}>
            <div className='stat-card-left'>
                <div className='stat-card-title'>{title}</div>
                <div className='stat-card-value'>{value}</div>
            </div>
            <div className='stat-card-icon'>
                <Icon />
            </div>
        </div>
    );
}

export default StatCard;