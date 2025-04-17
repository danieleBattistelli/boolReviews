import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const [searchText, setSearchText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Stato per il tema scuro
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearch = searchText.trim();
    if (trimmedSearch !== "") {
      navigate(`/api/reviews/?search=${encodeURIComponent(trimmedSearch)}`);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/api/reviews">
            <img
              src="/logo.jpg"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            BoolReviews
          </a>
          <form className="d-flex mx-auto" style={{ width: "50%" }} onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca recensioni"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Cerca
            </button>
          </form>
          {/* Pulsante per il tema scuro */}
          <button
            className="btn btn-outline-light"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? "Disattiva Tema Scuro" : "Attiva Tema Scuro"}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;