import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import ManageProjects from "./pages/ManageProjects";
import ProjectDetail from "./pages/ProjectDetail";
import ManageAbout from "./pages/ManageAbout";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='grow'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/projects/:id' element={<ProjectDetail />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verify-otp' element={<VerifyOTP />} />
                <Route
                  path='/admin'
                  element={
                    <ProtectedRoute adminOnly>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/admin/projects'
                  element={
                    <ProtectedRoute adminOnly>
                      <ManageProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/admin/about'
                  element={
                    <ProtectedRoute adminOnly>
                      <ManageAbout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/admin/messages'
                  element={
                    <ProtectedRoute adminOnly>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

         
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
