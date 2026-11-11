import "./JobsPage.css";
import { useEffect, useState } from "react";
import type { VacancyCard } from "@/types/vacancy";
import type { Page } from "@/types/page";

const employmentLabels = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
};

const statusLabels = {
  PUBLISHED: "Opening soon",
  OPEN: "Accepting Applications",
};

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function daysAgo(date: string) {
  const published = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Math.round(
    (today.getTime() - published.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function JobsPage() {
  const [vacancies, setVacancies] = useState<VacancyCard[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [userErrorMsg, setUserErrorMsg] = useState<string>("");

  async function loadVacancies() {
    setLoading(true);
    setUserErrorMsg("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/vacancies/featured",
      );

      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const data: Page<VacancyCard> = await response.json();
      setVacancies(data.content);
      setTotalElements(data.totalElements);
    } catch (err: unknown) {
      console.error(err);
      setUserErrorMsg("We couldn't load the jobs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVacancies();
  }, []);

  return (
    <>
      {/* FRANJA DE BÚSQUEDA (blanca) */}
      <section className="search-band">
        <div className="container">
          <h1 className="search-band-title">Find jobs</h1>
          <p className="search-band-sub">
            Search every open position on Exosfera.
          </p>

          <form className="search-row">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="search"
                className="search-input"
                aria-label="Search jobs"
                placeholder="Job title, keyword, or description..."
              />
            </div>

            <select className="select-input" aria-label="State">
              <option value="">Any state</option>
              <option value="NY">New York (NY)</option>
            </select>

            <select className="select-input" aria-label="Employment type">
              <option value="">Any type</option>
              <option value="FULL_TIME">Full time</option>
              <option value="PART_TIME">Part time</option>
              <option value="CONTRACT">Contract</option>
            </select>

            <select className="select-input" aria-label="Work mode">
              <option value="">Any mode</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ONSITE">On-site</option>
            </select>

            <button type="submit" className="btn-search">
              Search
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>

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
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="results-section">
        <div className="container">
          <div className="results-bar">
            <p className="results-count">
              {totalElements} vacancies <span>featured</span>
            </p>

            <label className="sort">
              Sort by
              <select className="select-input">
                <option>Newest</option>
              </select>
            </label>
          </div>

          {/* 1. Loading */}
          {loading && (
            <div className="loading-state" role="status">
              <span className="loading-spinner"></span>
              <span>Finding opportunities for you...</span>
            </div>
          )}

          {/* 2. ERROR */}
          {!loading && userErrorMsg !== "" && (
            <div className="state-card error-state" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p>{userErrorMsg}</p>
              <button type="button" className="btn-search" onClick={loadVacancies}>
                Try again
              </button>
            </div>
          )}

          {/* 3. SIN RESULTADOS */}
          {!loading && userErrorMsg === "" && vacancies.length === 0 && (
            <div className="state-card">
              <div className="empty-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3>No jobs found</h3>
              <p>Try another keyword or explore a different category.</p>
            </div>
          )}

          {!loading && userErrorMsg === "" && vacancies.length > 0 && (
            <div className="job-list">
              {vacancies.map((vacancy) => (
                <article key={vacancy.id} className="job-card">
                  <div className="job-card-top">
                    <div className="company-logo">
                      {vacancy.companyName.charAt(0)}
                    </div>
                    <span
                      className={`job-status status-${vacancy.status.toLowerCase()}`}
                    >
                      <span className="status-dot"></span>
                      {statusLabels[vacancy.status]}
                    </span>
                  </div>

                  <div className="job-heading">
                    <span className="jh-badge badge-cat">
                      {vacancy.category}
                    </span>
                    <h3 className="job-title">{vacancy.name}</h3>
                    <p className="job-company">
                      <i className="fa-regular fa-building"></i>
                      {vacancy.companyName}
                    </p>
                  </div>

                  <div className="job-meta">
                    {vacancy.locations.map((location) => (
                      <span className="meta-item" key={location.id}>
                        <i className="fa-solid fa-location-dot"></i>
                        {location.city}, {location.state}
                      </span>
                    ))}

                    <span className="meta-item">
                      <i className="fa-solid fa-briefcase"></i>
                      {employmentLabels[vacancy.employmentType]}
                    </span>
                  </div>

                  <p className="job-desc">{vacancy.description}</p>

                  <div className="job-dates">
                    <span className="job-date">
                      <i className="fa-regular fa-clock"></i>
                      {daysAgo(vacancy.publishedDate)}
                    </span>
                    <span className="job-deadline">
                      <i className="fa-regular fa-calendar"></i>
                      {vacancy.status === "PUBLISHED" &&
                        "Opens " + formatDate(vacancy.openDate)}

                      {vacancy.status === "OPEN" &&
                        vacancy.closeDate !== null &&
                        "Closes " + formatDate(vacancy.closeDate)}

                      {vacancy.status === "OPEN" &&
                        vacancy.closeDate === null &&
                        "Open until filled"}
                    </span>
                  </div>

                  <div className="job-card-footer">
                    {vacancy.salary !== null && (
                      <span className="job-salary">
                        {vacancy.salary.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          currencyDisplay: "code",
                          maximumFractionDigits: 0,
                        })}
                        <small> / year</small>
                      </span>
                    )}

                    <a href="#" className="btn-view">
                      View
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default JobsPage;
