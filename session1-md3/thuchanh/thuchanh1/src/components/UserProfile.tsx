import React from 'react';
import './UserProfile.css';

interface UserProfileProps {
  name: string;
  role: string;
  email: string;
  avatarUrl?: string;
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  // Fix logic: Use curly braces {props.name}, {props.role}, {props.email} to output values dynamically in JSX
  return (
    <div className="user-profile-card">
      <div className="user-avatar-container">
        {props.avatarUrl ? (
          <img 
            src={props.avatarUrl} 
            alt={props.name} 
            className="user-avatar-image" 
          />
        ) : (
          <div className="user-avatar-placeholder">
            {props.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="user-info">
        <h3 className="user-name">{props.name}</h3>
        <p className="user-role">{props.role}</p>
        <p className="user-email">{props.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
