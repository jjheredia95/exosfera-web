import { useEffect, useState } from "react";
import type { HomeStat } from "@/types/home";
import "./HomePage.css";

function HomePage() {

  const [statistic, setStatistic] = useState<HomeStat>({
    jobsOpenCount: 0,
    companiesCount: 0,
    categoriesCount: 0,
    citiesCount: 0,
  });

  async function loadStats() {
    const response = await fetch("http://localhost:8080/api/home/stats");
    const data: HomeStat = await response.json();
    setStatistic(data);
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-decoration hero-decoration-one"></div>
        <div className="hero-decoration hero-decoration-two"></div>

        <div className="hero-photo" aria-hidden="true"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Find opportunities
               <span>beyond the sky.</span>
            </h1>

            <p className="hero-subtitle">
              Jobs that match your skills and ambitions.
            </p>

            <form className="hero-search">
              <label className="hero-search-field keyword">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  aria-label="Search jobs"
                  placeholder="Job title, keyword, or company"
                />
              </label>

              <span className="hero-search-divider" aria-hidden="true"></span>

              <label className="hero-search-field">
                <i className="fa-solid fa-location-dot"></i>
                <select aria-label="State">
                  <option value="">Any state</option>
                  <option value="NY">New York (NY)</option>
                  <option value="WA">Washington (WA)</option>
                </select>
              </label>

              <button type="submit" className="btn-search">
                Search
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
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
              <strong className="stat-value">{statistic.jobsOpenCount}+</strong>
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
                Filter by state, employment type, work mode and category to find
                what fits you.
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
                Post your vacancies on Exosfera and promote them as featured to
                appear first in search results.
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
    </>
  );
}

export default HomePage;
