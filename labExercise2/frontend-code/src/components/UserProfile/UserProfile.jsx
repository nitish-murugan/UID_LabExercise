import React from 'react';
import styles from './UserProfile.module.css';

const UserProfile = ({ 
  user, 
  isEditable = false, 
  onEdit,
  showStats = true 
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return styles.statusActive;
      case 'inactive':
        return styles.statusInactive;
      case 'banned':
        return styles.statusBanned;
      default:
        return styles.statusDefault;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return styles.roleAdmin;
      case 'user':
        return styles.roleUser;
      case 'moderator':
        return styles.roleModerator;
      default:
        return styles.roleDefault;
    }
  };

  if (!user) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.noUser}>
          <h2>No User Data Available</h2>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {/* Header Section */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {user.firstName && user.lastName 
                ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
                : user.username ? user.username.charAt(0).toUpperCase()
                : 'U'
              }
            </div>
            <div className={styles.userBasicInfo}>
              <h1 className={styles.userName}>
                {user.firstName && user.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user.username
                }
              </h1>
              <p className={styles.userEmail}>{user.email}</p>
              <div className={styles.badges}>
                <span className={`${styles.badge} ${getRoleColor(user.role)}`}>
                  {user.role?.toUpperCase() || 'USER'}
                </span>
                <span className={`${styles.badge} ${getStatusColor(user.status)}`}>
                  {user.status?.toUpperCase() || 'UNKNOWN'}
                </span>
              </div>
            </div>
          </div>
          
          {isEditable && (
            <div className={styles.actionButtons}>
              <button 
                className={styles.editButton}
                onClick={onEdit}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className={styles.profileContent}>
          <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>Profile Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Username</label>
                <p className={styles.infoValue}>{user.username || 'Not provided'}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Email Address</label>
                <p className={styles.infoValue}>{user.email || 'Not provided'}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>First Name</label>
                <p className={styles.infoValue}>{user.firstName || 'Not provided'}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Last Name</label>
                <p className={styles.infoValue}>{user.lastName || 'Not provided'}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>User ID</label>
                <p className={styles.infoValue}>#{user.id}</p>
              </div>
              
              <div className={styles.infoItem}>
                <label className={styles.infoLabel}>Account Status</label>
                <p className={styles.infoValue}>
                  <span className={`${styles.statusBadge} ${getStatusColor(user.status)}`}>
                    {user.status?.charAt(0).toUpperCase() + user.status?.slice(1) || 'Unknown'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          {showStats && (
            <div className={styles.statsSection}>
              <h3 className={styles.sectionTitle}>Account Statistics</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>{user.loginCount || 0}</div>
                  <div className={styles.statLabel}>Total Logins</div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>
                    {formatDate(user.joinedAt)}
                  </div>
                  <div className={styles.statLabel}>Member Since</div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>
                    {formatDate(user.lastLoginDate)}
                  </div>
                  <div className={styles.statLabel}>Last Login</div>
                  {user.lastLoginDate && (
                    <div className={styles.statSubtext}>
                      at {formatTime(user.lastLoginDate)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Account Timeline */}
          <div className={styles.timelineSection}>
            <h3 className={styles.sectionTitle}>Account Timeline</h3>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>📅</div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineTitle}>Account Created</div>
                  <div className={styles.timelineDate}>
                    {formatDate(user.joinedAt)} at {formatTime(user.joinedAt)}
                  </div>
                </div>
              </div>
              
              {user.lastLoginDate && (
                <div className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>🔑</div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineTitle}>Last Login</div>
                    <div className={styles.timelineDate}>
                      {formatDate(user.lastLoginDate)} at {formatTime(user.lastLoginDate)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
