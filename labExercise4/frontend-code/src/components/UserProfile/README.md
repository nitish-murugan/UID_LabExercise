# UserProfile Component

A React component for displaying user profile information using props. This component demonstrates how to create reusable components with flexible prop configurations.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Flexible Props**: Configurable through various props
- **Modern Styling**: Uses CSS modules for scoped styling
- **User Status Indicators**: Shows role badges and account status
- **Account Statistics**: Displays login counts and membership info
- **Timeline View**: Shows account creation and activity history
- **Avatar Generation**: Auto-generates initials-based avatars

## Component Location

```
src/components/UserProfile/
├── UserProfile.jsx           # Main component
├── UserProfile.module.css    # Styling
└── UserProfileExample.jsx    # Usage example
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `user` | Object \| null | Yes | - | User object containing profile data |
| `isEditable` | Boolean | No | false | Shows/hides edit button |
| `showStats` | Boolean | No | true | Shows/hides statistics section |
| `onEdit` | Function | No | - | Callback when edit button is clicked |
| `onSave` | Function | No | - | Callback for save actions |
| `onCancel` | Function | No | - | Callback for cancel actions |

## User Object Structure

The `user` prop should contain the following properties:

```javascript
{
  id: Number,              // Unique user identifier
  username: String,        // Username
  email: String,          // Email address
  firstName: String,      // First name (optional)
  lastName: String,       // Last name (optional)
  role: String,           // 'admin', 'user', 'moderator'
  status: String,         // 'active', 'inactive', 'banned'
  joinedAt: String,       // ISO date string
  loginCount: Number,     // Total login count
  lastLoginDate: String   // ISO date string (optional)
}
```

## Basic Usage

```jsx
import UserProfile from './components/UserProfile/UserProfile';

const MyComponent = () => {
  const user = {
    id: 1,
    username: 'johndoe',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    status: 'active',
    joinedAt: '2024-01-15T10:30:00.000Z',
    loginCount: 45,
    lastLoginDate: '2025-08-11T09:15:00.000Z'
  };

  return (
    <UserProfile 
      user={user}
      isEditable={true}
      showStats={true}
      onEdit={() => console.log('Edit clicked')}
    />
  );
};
```

## Advanced Usage with State Management

```jsx
import React, { useState, useEffect } from 'react';
import UserProfile from './components/UserProfile/UserProfile';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    // Navigate to edit form or enable inline editing
  };

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  return (
    <UserProfile 
      user={user}
      isEditable={!isEditing}
      showStats={true}
      onEdit={handleEdit}
      onSave={handleSave}
    />
  );
};
```

## Styling Customization

The component uses CSS modules for styling. You can customize the appearance by:

1. **Modifying the CSS module**: Edit `UserProfile.module.css`
2. **Overriding specific classes**: Use CSS specificity
3. **Creating a custom theme**: Modify CSS custom properties

### Key CSS Classes

- `.profileContainer` - Main container
- `.profileCard` - Card wrapper
- `.profileHeader` - Header section with gradient
- `.avatar` - User avatar circle
- `.badge` - Role/status badges
- `.infoGrid` - Information layout grid
- `.statsGrid` - Statistics cards grid
- `.timeline` - Activity timeline

## Demo Component

A comprehensive demo component is available at `src/components/UserProfileDemo/UserProfileDemo.jsx` that showcases:

- Different user types (admin, new user, incomplete profile)
- Props configuration options
- Interactive controls
- Props documentation
- Responsive behavior

To access the demo, navigate to the "User Profile" option in the navigation menu.

## Accessibility Features

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- High contrast support
- Responsive design for mobile devices

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Lab Exercise Compliance

This component fulfills the lab exercise requirements:

✅ **Creates a user profile page using props**
✅ **Demonstrates prop usage with different data types**
✅ **Shows conditional rendering based on props**
✅ **Implements reusable component architecture**
✅ **Includes comprehensive examples and documentation**

## Running the Component

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the application and log in with any user

3. Click "User Profile" in the navigation menu

4. Explore different demo configurations using the controls

## Future Enhancements

- Inline editing capabilities
- Profile picture upload
- Social media links
- Activity feed integration
- Export profile data
- Theme customization options
