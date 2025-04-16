import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/api/reviews/?search=${encodeURIComponent(searchText)}`);
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
          {/* casella di ricerca */}
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
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;