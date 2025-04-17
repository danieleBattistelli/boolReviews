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
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/api/reviews">
            <img
              src="/logo.jpg"
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top"
            />
            BoolReviews
          </a>
          <div className="d-flex ms-auto align-items-center">
            <a className="btn btn-outline-light me-2" href="/news">NEWS</a>
            <a className="btn btn-outline-light me-2" href="/recensioni">RECENSIONI</a>
            <a className="btn btn-outline-light me-2" href="/forum">FORUM</a>
            <a className="btn btn-outline-light me-2" href="/social">SOCIAL</a>
            <form className="d-flex me-2" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Cerca recensioni"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-outline-light d-flex align-items-center justify-content-center" type="submit">
                <svg
                  className="w-5 h-5 mb-0.5 inline"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="20"
                  height="20" // Specifica dimensioni esplicite
                >
                  <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
            </form>
            <button
              className="btn btn-outline-light dark-mode-toggle d-flex align-items-center justify-content-center"
              onClick={toggleDarkMode}
            >
              <svg
                className="dark-mode-toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24" // Specifica dimensioni esplicite
              >
                <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path>
                <path d="M0 0h24v24H0V0z" fill="none"></path>
              </svg>
            </button>
            <button
              className="btn btn-outline-light me-2"
              onClick={() => navigate('/api/login')}
            >
              Accedi
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;