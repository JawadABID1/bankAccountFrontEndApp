import React from 'react';

interface User {
    name: string;
    email: string;
    avatarUrl: string;
    bio: string;
}

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="row no-gutters">
                {/* Avatar Section */}
                <div className="col-md-4">
                    <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="card-img"
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                </div>

                {/* User Info Section */}
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.bio}</p>
                        <p className="card-text">
                            <small className="text-muted">{user.email}</small>
                        </p>
                        <button className="btn btn-primary">View Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
