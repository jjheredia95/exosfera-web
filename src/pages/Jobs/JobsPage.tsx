import "./JobsPage.css";
import { useEffect, useState } from "react";
import type { VacancyCard } from "@/types/vacancy";
import type { Category } from "@/types/category";
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
    (today.getTime() - published.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

type ResultsView = "FEATURED" | "ALL" | "SEARCH";

function JobsPage() {
  const [view, setView] = useState<ResultsView>("FEATURED");
  const [searchHint, setSearchHint] = useState<string>("");

  // CATEGORIES STATES
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [appliedCategoryId, setAppliedCategoryId] = useState<number | null>(
    null
  );

  const [vacancies, setVacancies] = useState<VacancyCard[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [userErrorMsg, setUserErrorMsg] = useState<string>("");

  async function loadCategories() {
    try {
      const response = await fetch("http://localhost:8080/api/categories");
      if (!response.ok) {
        throw new Error("Categories failed with status: " + response.status);
      }

      const catsData: Category[] = await response.json();
      setCategories(catsData);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadVacancies() {
    setLoading(true);
    setUserErrorMsg("");

    let url: string;

    if (view === "FEATURED") {
      url = "http://localhost:8080/api/jobs/featured";
    } else if (view === "ALL") {
      url = "http://localhost:8080/api/jobs/all";
    } else {
      url = `http://localhost:8080/api/jobs/search?categoryId=${appliedCategoryId}`;
    }

    try {
      const response = await fetch(url);

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

  function handleSearch(event: React.SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (selectedCategoryId === null) {
      setSearchHint("Select at least one filter to start a search.");
      return;
    }

    setSearchHint("");
    setAppliedCategoryId(selectedCategoryId);
    setView("SEARCH");
  }

  function showFeatured(): void {
    setSelectedCategoryId(null);
    setAppliedCategoryId(null);
    setSearchHint("");
    setView("FEATURED");
  }

  function showAllJobs(): void {
    setSelectedCategoryId(null);
    setAppliedCategoryId(null);
    setSearchHint("");
    setView("ALL");
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadVacancies();
  }, [view, appliedCategoryId]);

  return (
    <>
      {/* FRANJA DE BÚSQUEDA (blanca) */}
      <section className="search-band">
        <div className="container">
          <h1 className="search-band-title">Find jobs</h1>
          <p className="search-band-sub">
            Search every open position on Exosfera.
          </p>

          <form className="search-row" onSubmit={handleSearch}>
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="search"
                className="search-input"
                aria-label="Search jobs"
                placeholder="Enter keyword..."
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

          {searchHint !== "" && (
            <p className="search-hint">
              <i className="fa-solid fa-circle-info"></i>
              {searchHint}
            </p>
          )}

          <div className="filter-row">
            <span className="filter-row-label">Categories:</span>

            {/* CATS */}
            {categories.map((category) => (
              <button
                type="button"
                className={`f-pill ${
                  selectedCategoryId === category.id ? "active" : ""
                }`}
                key={category.id}
                onClick={() => {
                  setSelectedCategoryId(
                    selectedCategoryId === category.id ? null : category.id
                  );
                  setSearchHint("");
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS RESULTS */}
      <section className="results-section">
        <div className="container">
          <div className="results-bar">
            <h2 className="results-heading">
              Featured Jobs <span>{totalElements} vacancies</span>
            </h2>

            <div className="results-tabs">
              <button
                type="button"
                className={`results-tab ${view === "FEATURED" ? "active" : ""}`}
                onClick={showFeatured}
              >
                Featured
              </button>
              <button
                type="button"
                className={`results-tab ${view === "ALL" ? "active" : ""}`}
                onClick={showAllJobs}
              >
                All jobs
              </button>
            </div>
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
              <button
                type="button"
                className="btn-search"
                onClick={loadVacancies}
              >
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
