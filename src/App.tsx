import "./App.css";
import HomePage from "@/pages/Home/HomePage";
import JobsPage from "./pages/Jobs/JobsPage";
import { Routes, Route, Link, NavLink } from "react-router-dom";

function App() {

  return (
    <div className="home-page">
      {/* NAVBAR (INVITADO) — reemplaza la navbar del admin dentro de <div className="home-page"> */}
      <header className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">
              <i className="fa-solid fa-earth-americas"></i>
            </span>
            Exosfera
          </Link>

          <nav className="navbar-links" aria-label="Main navigation">
            <NavLink to="/jobs" className="nav-link">
              <i className="fa-solid fa-magnifying-glass"></i>
              Find jobs
            </NavLink>
            <a href="#" className="nav-link">
              <i className="fa-solid fa-building"></i>
              Companies
            </a>
            <a href="#" className="nav-link">
              <i className="fa-solid fa-bullhorn"></i>
              For employers
            </a>
          </nav>

          <div className="navbar-actions">
            <a href="#" className="btn-login">
              Log in
            </a>
            <a href="#" className="btn-signup">
              Sign up
            </a>

            <button
              type="button"
              className="navbar-toggle"
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/jobs" element={<JobsPage />}></Route>
        </Routes>
      </main>

      {/* FOOTER — pégalo justo antes del </div> que cierra <div className="home-page"> */}
      <footer className="footer">
        <div className="footer-glow" aria-hidden="true"></div>

        <div className="container footer-container">
          <div className="footer-brand">
            <Link to="/" className="navbar-brand footer-logo">
              <span className="brand-icon">
                <i className="fa-solid fa-earth-americas"></i>
              </span>
              Exosfera
            </Link>

            <p className="footer-tagline">
              Find opportunities beyond the sky. Connecting people with
              companies that help them grow.
            </p>

            <div className="footer-social">
              <a href="#" className="social-link" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <nav className="footer-column" aria-label="For job seekers">
            <h4 className="footer-title">For job seekers</h4>
            <Link to="/jobs" className="footer-link">
              Browse jobs
            </Link>
            <a href="#" className="footer-link">
              Companies
            </a>
            <a href="#" className="footer-link">
              Categories
            </a>
            <a href="#" className="footer-link">
              Create an account
            </a>
          </nav>

          <nav className="footer-column" aria-label="For employers">
            <h4 className="footer-title">For employers</h4>
            <a href="#" className="footer-link">
              Post a job
            </a>
            <a href="#" className="footer-link">
              Featured vacancies
              <span className="footer-badge">Promote</span>
            </a>
            <a href="#" className="footer-link">
              Pricing
            </a>
          </nav>

          <nav className="footer-column" aria-label="About">
            <h4 className="footer-title">Exosfera</h4>
            <a href="#" className="footer-link">
              About us
            </a>
            <a href="#" className="footer-link">
              Why "Exosfera"?
            </a>
            <a href="#" className="footer-link">
              Contact
            </a>
          </nav>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Exosfera. All rights reserved.</span>

          <span className="footer-stack">
            Built with
            <i className="fa-brands fa-java" title="Java"></i>
            Spring Boot
            <span className="dot">·</span>
            <i className="fa-brands fa-react" title="React"></i>
            React
            <span className="dot">·</span>
            PostgreSQL on AWS
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
