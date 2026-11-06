import { useEffect, useState } from "react";
import type { homeStat } from "./types/home";
import "./App.css";

function App() {
  const [statistic, setStatistic] = useState<homeStat>({
    jobsOpenCount: 0,
    companiesCount: 0,
    categoriesCount: 0,
    citiesCount: 0,
  });

  async function loadStats() {
    const response = await fetch("http://localhost:8080/api/home/stats");
    const data: homeStat = await response.json();
    setStatistic(data);
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="home-page">
      {/* NAVBAR (INVITADO) — reemplaza la navbar del admin dentro de <div className="home-page"> */}
      <header className="navbar">
        <div className="container navbar-container">
          <a href="#" className="navbar-brand">
            <span className="brand-icon">
              <i className="fa-solid fa-earth-americas"></i>
            </span>
            Exosfera
          </a>

          <nav className="navbar-links" aria-label="Main navigation">
            <a href="#" className="nav-link">
              <i className="fa-solid fa-magnifying-glass"></i>
              Find jobs
            </a>
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
        {/* HERO */}
        <section className="hero">
          <div className="hero-decoration hero-decoration-one"></div>
          <div className="hero-decoration hero-decoration-two"></div>

          <div className="hero-photo" aria-hidden="true"></div>

          <div className="container hero-container">
            <div className="hero-content">
              <span className="hero-eyebrow">
                <i className="fa-solid fa-compass"></i>
                YOUR NEXT OPPORTUNITY STARTS HERE
              </span>

              <h1>
                Discover opportunities
                <span>beyond the sky.</span>
              </h1>

              <p className="hero-subtitle">
                Jobs that match your skills and ambitions.
              </p>

              <form className="search-form">
                <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass search-icon"></i>

                  <input
                    type="search"
                    className="search-input"
                    aria-label="Search jobs"
                    placeholder="Job title, keyword, or description..."
                  />

                  <button type="submit" className="btn-search">
                    Search
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>

                <div className="filter-selects">
                  <label className="select-field">
                    <span className="select-label">
                      <i className="fa-solid fa-location-dot"></i> State
                    </span>
                    <select className="select-input">
                      <option value="">Any state</option>
                      <option value="NY">New York (NY)</option>
                      <option value="WA">Washington (WA)</option>
                    </select>
                  </label>

                  <label className="select-field">
                    <span className="select-label">
                      <i className="fa-solid fa-briefcase"></i> Employment type
                    </span>
                    <select className="select-input">
                      <option value="">Any type</option>
                      <option value="FULL_TIME">Full time</option>
                      <option value="PART_TIME">Part time</option>
                      <option value="CONTRACT">Contract</option>
                    </select>
                  </label>

                  <label className="select-field">
                    <span className="select-label">
                      <i className="fa-solid fa-house-laptop"></i> Work mode
                    </span>
                    <select className="select-input">
                      <option value="">Any mode</option>
                      <option value="REMOTE">Remote</option>
                      <option value="HYBRID">Hybrid</option>
                      <option value="ONSITE">On-site</option>
                    </select>
                  </label>
                </div>
              </form>

              <div className="filter-area">
                <span className="filter-label">Explore by category</span>

                <div className="filter-row">
                  <button type="button" className="f-pill active">
                    <i className="fa-solid fa-table-cells-large"></i>
                    All jobs
                  </button>

                  <button type="button" className="f-pill">
                    <i className="fa-solid fa-laptop-code"></i>
                    Technology
                  </button>

                  <button type="button" className="f-pill">
                    <i className="fa-solid fa-heart-pulse"></i>
                    Healthcare
                  </button>

                  <button type="button" className="f-pill clear-filter">
                    <i className="fa-solid fa-xmark"></i>
                    Clear filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-bar" aria-label="Exosfera in numbers">
          <div className="container stats-container">
            <div className="stat-item">
              <span className="stat-icon">
                <i className="fa-solid fa-briefcase"></i>
              </span>
              <div>
                <strong className="stat-value">
                  {statistic.jobsOpenCount}+
                </strong>
                <span className="stat-label">Open jobs</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">
                <i className="fa-solid fa-building"></i>
              </span>
              <div>
                <strong className="stat-value">
                  {statistic.companiesCount}+
                </strong>
                <span className="stat-label">Companies</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">
                <i className="fa-solid fa-layer-group"></i>
              </span>
              <div>
                <strong className="stat-value">
                  {statistic.categoriesCount}
                </strong>
                <span className="stat-label">Categories</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-icon">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <div>
                <strong className="stat-value">{statistic.citiesCount}+</strong>
                <span className="stat-label">Cities</span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED EMPLOYERS */}
        <section className="home-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2 className="section-title">Featured Employers</h2>
                <p className="section-description">
                  Our top partner companies are hiring now.
                </p>
              </div>

              <a href="#" className="reset-link">
                View all companies
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            <div className="logo-strip">
              <a href="#" className="logo-tile">
                <span className="logo-box">
                  <img src="/logos/cloudpeak.png" alt="CloudPeak Systems" />
                </span>
                <span className="logo-jobs">2 open jobs</span>
              </a>

              <a href="#" className="logo-tile">
                <span className="logo-box">
                  <img src="/logos/riverton.png" alt="Riverton Tech" />
                </span>
                <span className="logo-jobs">2 open jobs</span>
              </a>

              <a href="#" className="logo-tile">
                <span className="logo-box">
                  <img src="/logos/brightpath.png" alt="BrightPath Health" />
                </span>
                <span className="logo-jobs">2 open jobs</span>
              </a>

              <a href="#" className="logo-tile">
                <span className="logo-box">
                  <img src="/logos/meridian.png" alt="Meridian Financial" />
                </span>
                <span className="logo-jobs">1 open job</span>
              </a>

              <a href="#" className="logo-tile">
                <span className="logo-box">
                  <img src="/logos/northstar.png" alt="Northstar Learning" />
                </span>
                <span className="logo-jobs">1 open job</span>
              </a>

              <a href="#" className="logo-tile">
                <span className="logo-box">
                  <img src="/logos/lumen.png" alt="Lumen Creative" />
                </span>
                <span className="logo-jobs">1 open job</span>
              </a>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="home-section how-section">
          <div className="container">
            <div className="section-center">
              <span className="section-eyebrow">How it works</span>
              <h2 className="section-title-center">
                Your next job in three steps
              </h2>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <span className="step-number">1</span>
                <div className="step-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <h3 className="step-title">Search jobs</h3>
                <p className="step-text">
                  Filter by state, employment type, work mode and category to
                  find what fits you.
                </p>
              </div>

              <div className="step-card">
                <span className="step-number">2</span>
                <div className="step-icon">
                  <i className="fa-solid fa-user-pen"></i>
                </div>
                <h3 className="step-title">Create your profile</h3>
                <p className="step-text">
                  Sign up for free and tell employers about your skills and
                  experience.
                </p>
              </div>

              <div className="step-card">
                <span className="step-number">3</span>
                <div className="step-icon">
                  <i className="fa-solid fa-paper-plane"></i>
                </div>
                <h3 className="step-title">Apply</h3>
                <p className="step-text">
                  Send your application and follow every opportunity from your
                  account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HIRING? (para empresas) */}
        <section className="home-section">
          <div className="container">
            <div className="hiring-banner">
              <div className="hiring-glow" aria-hidden="true"></div>

              <div className="hiring-content">
                <span className="hiring-eyebrow">
                  <i className="fa-solid fa-bullhorn"></i> For employers
                </span>
                <h2 className="hiring-title">Hiring? Reach more candidates.</h2>
                <p className="hiring-text">
                  Post your vacancies on Exosfera and promote them as featured
                  to appear first in search results.
                </p>
              </div>

              <div className="hiring-actions">
                <a href="#" className="btn-hiring-primary">
                  Post a job
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
                <a href="#" className="btn-hiring-secondary">
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER — pégalo justo antes del </div> que cierra <div className="home-page"> */}
      <footer className="footer">
        <div className="footer-glow" aria-hidden="true"></div>

        <div className="container footer-container">
          <div className="footer-brand">
            <a href="#" className="navbar-brand footer-logo">
              <span className="brand-icon">
                <i className="fa-solid fa-earth-americas"></i>
              </span>
              Exosfera
            </a>

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
            <a href="#" className="footer-link">
              Browse jobs
            </a>
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
