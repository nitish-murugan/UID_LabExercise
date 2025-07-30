import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from "./components/loginComponent/login";
import Register from "./components/registerComponent/register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import NavBar from "./components/NavBar/NavBar";

// Import the three main pages
import BlogPage from "./pages/BlogPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginTrackerPage from "./pages/LoginTrackerPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div style={{ marginTop: '76px' }}>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/tracker" element={<LoginTrackerPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;