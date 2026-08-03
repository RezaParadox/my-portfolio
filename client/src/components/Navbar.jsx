import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

// LanguageSwitcher
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: t("navbar.home") },
    { path: "/", hash: "#about", label: t("home.title-2") },
    { path: "/", hash: "#projects", label: t("navbar.projects") },
    { path: "/contact", label: t("navbar.contact") },
  ];

  const scrollToSection = (hash) => {
    const scrollNow = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollNow, 120);
    } else {
      scrollNow();
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
    <div className='fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4'>
      {/* 1. APPLY glass3d CLASS HERE */}

      <nav className='glass3d flex items-center gap-6 px-6 py-2 rounded-full'>
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
              <Link
                to={user.role === "admin" ? "/admin" : "/profile"}
                className={navLinkClass({ path: "/" })}
              >
                {user.role === "admin"
                  ? t("navbar.dashboard")
                  : t("navbar.profile")}
              </Link>
              <button
                onClick={logout}
                className='text-sm font-medium text-(--navbar-text) hover:text-(--navbar-text-hover)'
              >
                {t("navbar.logout")}
              </button>
            </>
          ) : (
            <Link
              to='/login'
              className='px-5 py-2 text-sm font-medium text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-all'
            >
              {t("navbar.login")}
            </Link>
          )}

          <LanguageSwitcher />

          <button
            onClick={toggleTheme}
            className='p-2 rounded-full border transition-all duration-300 hover:scale-110'
            style={{
              borderColor: "var(--navbar-border)",
              color: "var(--foreground)",
            }}
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className='flex items-center gap-2 md:hidden'>
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full border border-(--navbar-border)'
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button
            className='p-2 rounded-full border border-(--navbar-border)'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* 2. APPLY glass3d CLASS TO MOBILE MENU AS WELL */}
      {mobileMenuOpen && (
        <div className='glass3d md:hidden fixed top-full w-96  rounded-2xl p-4  '>
          {navLinks.map((link) =>
            link.hash ? (
              <button
                key={link.hash}
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection(link.hash);
                }}
                className={`block w-full text-left py-3 text-sm font-medium ${isActive(link) ? "text-(--navbar-text-active)" : "text-(--navbar-text)"}`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-sm font-medium ${isActive(link) ? "text-(--navbar-text-active)" : "text-(--navbar-text)"}`}
              >
                {link.label}
              </Link>
            ),
          )}

          <div className='flex flex-col items-center gap-4 mt-4 w-full'>
            {!user ? (
              <Link
                to='/login'
                className='mt-2 px-8 py-2 glass3d rounded-full text-white'
              >
                {t("navbar.login")}
              </Link>
            ) : (
              <button onClick={logout} className='text-red-400'>
               {t("navbar.logout")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
