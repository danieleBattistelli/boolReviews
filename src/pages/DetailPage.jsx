import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactModal from "react-modal";

// Importazione delle librerie necessarie

function DetailPage() {

  // Recupero dell'ID dalla URL
  const { id } = useParams();

  // Stato per i dettagli della recensione
  const [detail, setDetail] = useState(null);

  // Navigazione per tornare alla lista
  const navigate = useNavigate();

  // Stato per la modalità scura
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Stato per gestire la visibilità della modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funzione per aprire la modale
  const openModal = () => setIsModalOpen(true);

  // Funzione per chiudere la modale
  const closeModal = () => setIsModalOpen(false);

  // Funzione per formattare la data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Effetto per recuperare i dettagli della recensione
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/reviews/${id}`)
      .then((resp) => {
        setDetail(resp.data.data);
      })
      .catch((error) => { });
  }, [id]);

  // Effetto per gestire la modalità scura
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Controllo per il caricamento dei dettagli
  if (!detail) {
    return <p>Caricamento...</p>;
  }

  return (
    <main>

      {/* Sezione principale della pagina */}
      <div className="detail-page">

        {/* Titolo del gioco */}
        <div className="text-center">
          <h1 className="detail-game-title">{detail.gametitle}</h1>
        </div>

        {/* Immagine del gioco */}
        <div className="text-center w-25">
          <div className="image-card">
            <img
              src={`http://127.0.0.1:8000/storage/${detail.image}`}
              alt={detail.gametitle}
              className="img-fluid"
              onClick={openModal} // Aggiunto evento onClick
              style={{ cursor: "pointer" }} // Aggiunto stile per il cursore
            />
          </div>
        </div>

        {/* Modale per visualizzare l'immagine a tutto schermo */}
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="image-modal"
          overlayClassName="image-modal-overlay"
          ariaHideApp={false}
        >
          <button className="close-modal-btn" onClick={closeModal}>
            &times;
          </button>
          <img
            src={`http://127.0.0.1:8000/storage/${detail.image}`}
            alt={detail.gametitle}
            className="img-fluid"
          />
        </ReactModal>

        {/* Sezione del genere */}
        <div className="review-section">
          <h2 className="section-title">Genere:{detail.genre.name}</h2>
        </div>

        {/* Sezione delle piattaforme */}
        <div className="review-section">
          <h2 className="section-title">Piattaforme</h2>
          <p>
            {detail.platforms.map((platform) => (
              <span
                key={platform.id}
                className="platform-badge"
                style={{ backgroundColor: platform.color }}
              >
                {platform.name}
              </span>
            ))}
          </p>
        </div>

        {/* Titolo della recensione */}
        <div className="review-section">
          <h2 className="section-title">{detail.reviewTitle}</h2>
        </div>

        {/* Corpo della recensione */}
        <div className="review-section">
          <h2 className="section-title">{detail.reviewBody}</h2>
          <div className="reviewer-section">
            <h5 className="section-title">{detail.reviewerName}  {formatDate(detail.reviewDate)}</h5>
          </div>
        </div>

        {/* Sezione della valutazione */}
        <div className="rating-section">
          <h2 className="section-title">Valutazione</h2>
          <div style={{ width: "100px", margin: "0 auto" }}>
            <CircularProgressbar
              value={detail.rating * 10}
              text={
                <tspan
                  className={`rating-text ${isDarkMode ? "dark-mode-text" : ""}`}
                >
                  {detail.rating}
                </tspan>
              }
              styles={buildStyles({
                pathColor: isDarkMode ? "#00ff00" : "#007bff",
                trailColor: isDarkMode ? "#444" : "#d6d6d6",
              })}
            />
          </div>
        </div>

        {/* Pulsante per tornare alla lista */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/api/reviews")}
            className="btn btn-outline-primary"
          >
            Torna alla lista delle recensioni
          </button>
        </div>
      </div>
    </main>
  );
}

export default DetailPage;