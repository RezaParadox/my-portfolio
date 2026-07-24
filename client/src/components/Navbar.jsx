import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { hash: "#about", label: "About" },
    { hash: "#projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  const scrollToSection = (hash) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (link) => {
    if (link.hash)
      return location.pathname === "/" && location.hash === link.hash;
    return location.pathname === link.path;
  };

  const navLinkClass = (link) =>
    `text-sm font-medium transition-colors ${
      isActive(link)
        ? "text-[var(--navbar-text-active)]"
        : "text-[var(--navbar-text)] hover:text-[var(--navbar-text-hover)]"
    }`;

  return (
    <div className='fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4'>
      <nav
        className='flex items-center gap-6 px-5 py-2 backdrop-blur-xl border rounded-full shadow-2xl'
        style={{
          background: "var(--navbar-bg)",
          borderColor: "var(--navbar-border)",
        }}
      >
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2 -my-3'>
          <img
            src='/mylogo2.png'
            alt='Logo'
            className='w-16 h-16 object-contain'
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          {navLinks.map((link) =>
            link.hash ? (
              <button
                key={link.hash}
                onClick={() => scrollToSection(link.hash)}
                className={navLinkClass(link)}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={navLinkClass(link)}
              >
                {link.label}
              </Link>
            ),
          )}
          {user ? (
            <>
              {user.role === "admin" ? (
                <Link
                  to='/admin'
                  className={`text-sm font-medium transition-colors ${
                    location.pathname.startsWith("/admin")
                      ? "text-(--navbar-text-active)"
                      : "text-(--navbar-text) hover:text-(--navbar-text-hover)"
                  }`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to='/profile'
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === "/profile"
                      ? "text-(--navbar-text-active)"
                      : "text-(--navbar-text) hover:text-(--navbar-text-hover)"
                  }`}
                >
                  Profile
                </Link>
              )}
              <button
                onClick={logout}
                className='text-sm font-medium text-(--navbar-text) hover:text-(--navbar-text-hover)'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              className='px-5 py-2 text-sm font-medium text-primary border border-(--primary)/30 rounded-full hover:bg-(--primary)/10 transition-all'
            >
              Sign in
            </Link>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full border transition-all duration-300 hover:scale-110'
            style={{
              background: "var(--footer-social-bg)",
              borderColor: "var(--navbar-border)",
              color: "var(--foreground)",
            }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className='flex items-center gap-2 md:hidden'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full border transition-all duration-300'
            style={{
              background: "var(--footer-social-bg)",
              borderColor: "var(--navbar-border)",
              color: "var(--foreground)",
            }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            className='p-2 rounded-full border backdrop-blur-xl'
            style={{
              background: "var(--navbar-bg)",
              borderColor: "var(--navbar-border)",
              color: "var(--navbar-text)",
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className='md:hidden fixed top-20 left-4 right-4 backdrop-blur-xl border rounded-2xl p-4 shadow-2xl'
          style={{
            background: "var(--navbar-mobile-bg)",
            borderColor: "var(--navbar-mobile-border)",
          }}
        >
          {navLinks.map((link) =>
            link.hash ? (
              <button
                key={link.hash}
                onClick={() => {
                  scrollToSection(link.hash);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 text-sm font-medium ${
                  isActive(link)
                    ? "text-(--navbar-text-active)"
                    : "text-(--navbar-text) hover:text-(--navbar-text-hover)"
                }`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-sm font-medium ${
                  isActive(link)
                    ? "text-(--navbar-text-active)"
                    : "text-(--navbar-text) hover:text-(--navbar-text-hover)"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
          {user ? (
            <>
              {user.role === "admin" ? (
                <Link
                  to='/admin'
                  onClick={() => setMobileMenuOpen(false)}
                  className='block py-3 text-sm font-medium text-(--navbar-text) hover:text-(--navbar-text-hover)'
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to='/profile'
                  onClick={() => setMobileMenuOpen(false)}
                  className='block py-3 text-sm font-medium text-(--navbar-text) hover:text-(--navbar-text-hover)'
                >
                  Profile
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className='block py-3 text-sm font-medium text-(--navbar-text) hover:text-(--navbar-text-hover)'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              onClick={() => setMobileMenuOpen(false)}
              className='block py-3 text-sm font-medium text-(--navbar-text) hover:text-(--navbar-text-hover)'
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
