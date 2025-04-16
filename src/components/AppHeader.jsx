import 'bootstrap/dist/css/bootstrap.min.css';

function AppHeader() {
  return (
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/logo.jpg"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            BoolReviews
          </a>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;