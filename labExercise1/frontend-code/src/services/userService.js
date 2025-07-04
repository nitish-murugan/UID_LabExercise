// User data service to replace backend API
class UserService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    // Initialize with default user if not exists
    if (!localStorage.getItem('users')) {
      const defaultUsers = [
        {
          id: 1,
          username: 'nitish',
          email: 'nitish@gmail.com',
          firstName: 'Nitish',
          lastName: 'User',
          password: '12345678',
          role: 'user',
          status: 'active',
          joinedAt: new Date().toISOString(),
          loginCount: 0,
          lastLoginDate: null
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Initialize login tracking data
    if (!localStorage.getItem('loginTracking')) {
      const loginTracking = {
        currentDate: new Date().toDateString(),
        dailyLogins: {}, // { userId: count }
        currentlyOnline: [] // array of user IDs
      };
      localStorage.setItem('loginTracking', JSON.stringify(loginTracking));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getLoginTracking() {
    return JSON.parse(localStorage.getItem('loginTracking') || '{}');
  }

  saveLoginTracking(tracking) {
    localStorage.setItem('loginTracking', JSON.stringify(tracking));
  }

  // Reset daily login counts if it's a new day
  checkAndResetDailyTracking() {
    const tracking = this.getLoginTracking();
    const currentDate = new Date().toDateString();
    
    if (tracking.currentDate !== currentDate) {
      tracking.currentDate = currentDate;
      tracking.dailyLogins = {};
      // Keep currently online users as they might still be online from previous day
      this.saveLoginTracking(tracking);
    }
  }

  login(email, password) {
    this.checkAndResetDailyTracking();
    
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Update user's login count and last login date
    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLoginDate = new Date().toISOString();
    this.saveUsers(users);

    // Update daily login tracking
    const tracking = this.getLoginTracking();
    tracking.dailyLogins[user.id] = (tracking.dailyLogins[user.id] || 0) + 1;
    
    // Add to currently online if not already there
    if (!tracking.currentlyOnline.includes(user.id)) {
      tracking.currentlyOnline.push(user.id);
    }
    
    this.saveLoginTracking(tracking);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: `token-${user.id}-${Date.now()}`
    };
  }

  register(userData) {
    const users = this.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email || u.username === userData.username);
    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      role: 'user',
      status: 'active',
      joinedAt: new Date().toISOString(),
      loginCount: 0,
      lastLoginDate: null
    };

    users.push(newUser);
    this.saveUsers(users);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: `token-${newUser.id}-${Date.now()}`
    };
  }

  logout(userId) {
    const tracking = this.getLoginTracking();
    tracking.currentlyOnline = tracking.currentlyOnline.filter(id => id !== userId);
    this.saveLoginTracking(tracking);
  }

  getDailyLoginStats() {
    this.checkAndResetDailyTracking();
    const tracking = this.getLoginTracking();
    const users = this.getUsers();
    
    return {
      dailyLogins: tracking.dailyLogins,
      currentlyOnline: tracking.currentlyOnline.map(id => 
        users.find(u => u.id === id)
      ).filter(Boolean),
      totalDailyLogins: Object.values(tracking.dailyLogins).reduce((sum, count) => sum + count, 0),
      currentDate: tracking.currentDate
    };
  }

  getAllUsers() {
    const users = this.getUsers();
    return users.map(({ password, ...user }) => user);
  }
}

// Export singleton instance
export const userService = new UserService();
