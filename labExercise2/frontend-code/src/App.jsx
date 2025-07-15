import React, { useState } from 'react';
import LoginComponent from "./components/loginComponent/login";
import Register from "./components/registerComponent/register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import BlogViewer from "./components/BlogViewer/BlogViewer";
import LoginTracker from "./components/LoginTracker/LoginTracker";
import NavBar from "./components/NavBar/NavBar";
import UserProfileDemo from "./components/UserProfileDemo/UserProfileDemo";

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <LoginComponent onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogViewer onNavigate={handleNavigate} />;
      case 'tracker':
        return <LoginTracker />;
      case 'profile':
        return <UserProfileDemo onNavigate={handleNavigate} />;
      default:
        return <LoginComponent onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      <div style={{ marginTop: '76px' }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;