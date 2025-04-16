import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DetailPage() {
  const { id } = useParams(); // Ottieni l'ID dalla URL
  const [detail, setDetail] = useState(null); // Stato per i dettagli della card
  const navigate = useNavigate(); // Inizializza useNavigate

  useEffect(() => {
    // Recupera i dettagli della card dall'API
    axios
      .get(`http://127.0.0.1:8000/api/reviews/${id}`)
      .then((resp) => {
        setDetail(resp.data.data); // Imposta i dettagli nel state
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dettagli:", error);
      });
  }, [id]);

  if (!detail) {
    return <p>Caricamento...</p>; // Mostra un messaggio di caricamento
  }

  return (
    <div className="detail-page">
      <div className="text-center">
        <h1 className="detail-game-title">{detail.gametitle}</h1>
      </div>
      <div className="text-center w-25">
        <div className="image-card">
          <img
            src={`http://127.0.0.1:8000/storage/${detail.image}`}
            alt={detail.gametitle}
            className="img-fluid"
          />
        </div>
      </div>

      <div className="review-section">
        <h2 className="section-title">Genere:{detail.genre.name}</h2>
      </div>

      <div className="review-section">
        <h2 className="section-title">Piattaforme</h2>
        <p>
          {detail.platforms.map((platform) => (
            <span
              key={platform.id}
              style={{
                backgroundColor: platform.color,
                color: "#fff",
                padding: "5px 10px",
                marginRight: "5px",
                borderRadius: "5px",
              }}
            >
              {platform.name}
            </span>
          ))}
        </p>
      </div>

      <div className="review-section">
        <h2 className="section-title">{detail.reviewTitle}</h2>
        
      </div>

      <div className="review-section">
        <h2 className="section-title">{detail.reviewBody}</h2>
        <p></p>
      </div>
      <div className="rating-section">
        <h2 className="section-title">{detail.rating}/10</h2>
        <p></p>
      </div>

      <div className="reviewer-section">
        <h5 className="section-title">{detail.reviewerName}   {detail.reviewDate}</h5>
      </div>

      {/* Aggiungi il bottone per tornare alla lista */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/api/reviews")} // Naviga alla lista delle recensioni
          className="btn btn-outline-primary"
        >
          Torna alla lista delle recensioni
        </button>
      </div>
    </div>
  );
}

export default DetailPage;