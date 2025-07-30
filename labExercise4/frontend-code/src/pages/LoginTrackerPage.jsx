import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import styles from '../components/LoginTracker/LoginTracker.module.css';

const LoginTrackerPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    dailyLogins: {},
    currentlyOnline: [],
    totalDailyLogins: 0,
    currentDate: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    loadStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(() => {
      loadStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [navigate]);

  const loadStats = () => {
    const loginStats = userService.getDailyLoginStats();
    setStats(loginStats);
  };

  const handleRefresh = () => {
    loadStats();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Login Activity Tracker</h2>
        <button onClick={handleRefresh} className={styles.refreshButton}>
          🔄 Refresh
        </button>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Daily Logins</h3>
          <div className={styles.statValue}>{stats.totalDailyLogins}</div>
          <div className={styles.statSubtext}>Today ({stats.currentDate})</div>
        </div>
        
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Currently Online</h3>
          <div className={styles.statValue}>{stats.currentlyOnline.length}</div>
          <div className={styles.statSubtext}>Active users</div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Daily Login Counts</h3>
        <div className={styles.loginCounts}>
          {Object.keys(stats.dailyLogins).length > 0 ? (
            Object.entries(stats.dailyLogins).map(([userId, count]) => {
              const user = stats.currentlyOnline.find(u => u.id === parseInt(userId)) ||
                          userService.getAllUsers().find(u => u.id === parseInt(userId));
              return (
                <div key={userId} className={styles.loginItem}>
                  <span className={styles.userName}>
                    {user ? `${user.firstName} ${user.lastName} (${user.email})` : `User ID: ${userId}`}
                  </span>
                  <span className={styles.loginCount}>{count} login{count > 1 ? 's' : ''}</span>
                </div>
              );
            })
          ) : (
            <div className={styles.noData}>No logins recorded today</div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Currently Online Users</h3>
        <div className={styles.onlineUsers}>
          {stats.currentlyOnline.length > 0 ? (
            stats.currentlyOnline.map(user => (
              <div key={user.id} className={styles.onlineUser}>
                <div className={styles.userInfo}>
                  <div className={styles.userAvatar}>
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <div className={styles.userDetails}>
                    <div className={styles.userName}>{user.firstName} {user.lastName}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                    <div className={styles.userRole}>{user.role}</div>
                  </div>
                </div>
                <div className={styles.onlineIndicator}>🟢 Online</div>
              </div>
            ))
          ) : (
            <div className={styles.noData}>No users currently online</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginTrackerPage;
