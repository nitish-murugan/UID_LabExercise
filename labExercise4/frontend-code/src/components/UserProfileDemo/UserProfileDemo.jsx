import React, { useState, useEffect } from 'react';
import UserProfile from '../UserProfile/UserProfile';
import styles from './UserProfileDemo.module.css';

const UserProfileDemo = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    // Load current user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleEdit = () => {
    alert('Edit functionality would be implemented here!');
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h1 className={styles.demoTitle}>User Profile</h1>
        <p className={styles.demoDescription}>
          View and manage your profile information.
        </p>
        
        <button 
          className={styles.backButton}
          onClick={() => onNavigate('login')}
        >
          ← Back to App
        </button>
      </div>

      <div className={styles.demoControls}>
        <div className={styles.controlGroup}>
          <h3>Profile Options</h3>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input 
                type="checkbox" 
                checked={isEditable}
                onChange={(e) => setIsEditable(e.target.checked)}
              />
              <span>Enable Edit Mode</span>
            </label>
            
            <label className={styles.checkbox}>
              <input 
                type="checkbox" 
                checked={showStats}
                onChange={(e) => setShowStats(e.target.checked)}
              />
              <span>Show Account Statistics</span>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.componentDemo}>
        <UserProfile 
          user={currentUser}
          isEditable={isEditable}
          showStats={showStats}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default UserProfileDemo;
