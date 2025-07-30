import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import styles from '../components/UserProfileDemo/UserProfileDemo.module.css';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

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
  }, [navigate]);

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
              <span className={styles.checkmark}></span>
              Enable Edit Mode
            </label>
            
            <label className={styles.checkbox}>
              <input 
                type="checkbox" 
                checked={showStats}
                onChange={(e) => setShowStats(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              Show Profile Statistics
            </label>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <h3>Quick Actions</h3>
          <div className={styles.buttonGroup}>
            <button 
              className={styles.actionButton}
              onClick={handleEdit}
            >
              ✏️ Edit Profile
            </button>
            <button 
              className={styles.actionButton}
              onClick={() => navigate('/blog')}
            >
              📝 View Blog Posts
            </button>
            <button 
              className={styles.actionButton}
              onClick={() => navigate('/tracker')}
            >
              📊 Login Activity
            </button>
          </div>
        </div>
      </div>

      <div className={styles.profileSection}>
        {currentUser ? (
          <UserProfile 
            user={currentUser}
            isEditable={isEditable}
            showStats={showStats}
          />
        ) : (
          <div>Please log in to view your profile.</div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
