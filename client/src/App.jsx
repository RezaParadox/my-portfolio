import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageProjects from './pages/ManageProjects';
import ManageAbout from './pages/ManageAbout';
import Messages from './pages/Messages';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/projects" element={
                <ProtectedRoute>
                  <ManageProjects />
                </ProtectedRoute>
              } />
              <Route path="/admin/about" element={
                <ProtectedRoute>
                  <ManageAbout />
                </ProtectedRoute>
              } />
              <Route path="/admin/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
