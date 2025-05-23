import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function AppHeader() {

  // Stato per il testo di ricerca
  const [searchText, setSearchText] = useState('');

  // Stato per il genere selezionato
  const [selectedGenre, setSelectedGenre] = useState('');

  // Stato per la piattaforma selezionata
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Stato per la modalità scura
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Stato per la visibilità del modal di login
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Stato per l'email dell'utente
  const [email, setEmail] = useState('');

  // Stato per la password dell'utente
  const [password, setPassword] = useState('');

  // Stato per l'utente autenticato
  const [user, setUser] = useState(null);

  // Hook per la navigazione
  const navigate = useNavigate();

  // Effetto per caricare la modalità scura salvata
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);

    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Funzione per gestire la ricerca
  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = searchText.trim();
    const genreFilter = selectedGenre ? `genre=${encodeURIComponent(selectedGenre)}` : '';
    const platformFilter = selectedPlatform ? `platform=${encodeURIComponent(selectedPlatform)}` : '';
    const searchFilter = trimmedSearch ? `search=${encodeURIComponent(trimmedSearch)}` : '';
    const query = [searchFilter, genreFilter, platformFilter].filter(Boolean).join('&');

    navigate(`/api/reviews?${query}`);
  };

  // Funzione per attivare/disattivare la modalità scura
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);

      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }

      return newMode;
    });
  };

  // Funzione per chiudere il modal di login
  const handleLoginModalClose = () => setShowLoginModal(false);

  // Funzione per mostrare il modal di login
  const handleLoginModalShow = () => setShowLoginModal(true);

  // Funzione per gestire il login
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Inserisci sia email che password.');
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/login`,
        {
          email: email,
          password: password,
        }
      );

      const { message, token, user } = response.data;

      alert(message);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      handleLoginModalClose();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Credenziali non valide. Riprova.');
      } else {
        alert('Si è verificato un errore. Riprova più tardi.');
      }
    }
  };

  return (
    <>

      {/* Header con barra di navigazione */}
      <header>
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">

            {/* Logo e nome del sito */}
            <a className="navbar-brand d-flex align-items-center" href="/api/reviews">
              <img
                src="/logo.jpg"
                alt="Logo"
                width="40"
                height="40"
                className="d-inline-block align-text-top"
              />
              <span className="ms-2 align-middle">BoolReviews</span>
            </a>

            {/* Sezione di navigazione e ricerca */}
            <div className="d-flex ms-auto align-items-center">
              <a className="btn btn-outline-light me-2" href="/news">NEWS</a>
              <a className="btn btn-outline-light me-2" href="/api/reviews">RECENSIONI</a>
              <a className="btn btn-outline-light me-2" href="/forum">FORUM</a>
              <a className="btn btn-outline-light me-2" href="/social">SOCIAL</a>

              {/* Form per la ricerca */}
              <form className="d-flex me-2" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Cerca recensioni"
                  aria-label="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                {/* Selezione del genere */}
                <select
                  className="form-select me-2"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="">Tutti i generi</option>
                  <option value="Action">Azione</option>
                  <option value="Adventure">Avventura</option>
                  <option value="RPG">Gioco di ruolo</option>
                  <option value="Shooter">Sparatutto</option>
                  <option value="Simulation">Simulazione</option>
                  <option value="Strategy">Strategia</option>
                  <option value="Sports">Sport</option>
                  <option value="Puzzle">Rompicapo</option>
                  <option value="Racing">Di Guida</option>
                </select>
                <select
                  className="form-select me-2"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                >
                  <option value="">Tutte le piattaforme</option>
                  <option value="PC">PC</option>
                  <option value="PlayStation">PlayStation</option>
                  <option value="Xbox">Xbox</option>
                  <option value="Nintendo">Nintendo</option>
                </select>
                <button className="btn btn-outline-light d-flex align-items-center justify-content-center" type="submit">
                  <svg
                    className="w-5 h-5 mb-0.5 inline"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="20"
                    height="20"
                  >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </button>
              </form>

              {/* Pulsante per la modalità scura */}
              <button
                className="btn btn-outline-light dark-mode-toggle d-flex align-items-center justify-content-center"
                onClick={toggleDarkMode}
              >
                <svg
                  className="dark-mode-toggle-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path>
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                </svg>
              </button>

              {/* Sezione per l'utente autenticato o il pulsante di login */}
              {user ? (
                <span className="navbar-text text-light me-2">
                  {user.name}
                </span>
              ) : (
                <button
                  className="btn btn-outline-light me-2"
                  onClick={handleLoginModalShow}
                >
                  Accedi
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>


      {/* Modal per il login */}
      <Modal show={showLoginModal} onHide={handleLoginModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Inserisci la tua password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginModalClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Accedi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AppHeader;