import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';

// Example of how to use the UserProfile component
const UserProfileExample = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setCurrentUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const handleEdit = () => {
    // Handle edit action
    console.log('Edit profile clicked');
    // You could navigate to an edit form or enable inline editing
  };

  const handleSave = (updatedUser) => {
    // Handle save action
    console.log('Save profile:', updatedUser);
    // Update localStorage and state
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Cancel edit');
    // Reset form or disable editing mode
  };

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  return (
    <UserProfile 
      user={currentUser}
      isEditable={true}
      showStats={true}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default UserProfileExample;
