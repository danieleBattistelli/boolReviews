import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import AppCard from "../components/AppCard";

function HomePage() {
  // Stato per memorizzare le recensioni ottenute dall'API
  const [reviews, setReviews] = useState([]);
  // Hook per la navigazione Utilizza useNavigate per navigare tra le pagine
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina corrente
  const [hasMore, setHasMore] = useState(true); // Stato per verificare se ci sono più pagine
  const [isLoading, setIsLoading] = useState(false); // Flag per evitare richieste duplicate

  useEffect(() => {
    // Scorre la pagina verso l'alto all'inizio
    window.scrollTo(0, 0);

    // Recupera le recensioni dall'API solo se non sono già state caricate
    if (!isLoading && reviews.length === 0) {
      setIsLoading(true); // Imposta il flag per indicare che i dati stanno per essere caricati
      getReviews();
    }
  }, []); // Assicurati che l'array di dipendenze sia vuoto per evitare richiami multipli

  // Funzione per ottenere la lista delle recensioni dall'API
  const getReviews = (page = 1) => {
    if (isLoading) return; // Evita chiamate duplicate
    setIsLoading(true); // Imposta il flag per indicare che i dati stanno per essere caricati

    axios
      .get(`http://127.0.0.1:8000/api/reviews?page=${page}`)
      .then((resp) => {
        const newReviews = resp.data.data.data;

        // Evita di aggiungere recensioni duplicate
        setReviews((prevReviews) => {
          const existingIds = new Set(prevReviews.map((review) => review.id));
          const filteredReviews = newReviews.filter(
            (review) => !existingIds.has(review.id)
          );
          return [...prevReviews, ...filteredReviews];
        });

        // Controlla se ci sono più pagine
        setHasMore(resp.data.data.next_page_url !== null);

        // Reimposta il flag dopo il caricamento
        setIsLoading(false);

        console.log(newReviews);
      })
      .catch((error) => {
        // Reimposta il flag in caso di errore
        setIsLoading(false);

        console.log("Response get reviews error:", error);
      });
  };

  // Funzione per caricare più recensioni
  const loadMoreReviews = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getReviews(nextPage);

    // Scorri automaticamente in fondo alla pagina
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 500); // Ritardo per assicurarsi che le recensioni siano caricate
  };

  // Funzione per generare le stelle in base al rating
  const renderStars = (rating) => {
    const normalizedRating = Math.round((rating / 10) * 5); // Normalizza il rating su una scala da 1 a 5
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i < normalizedRating ? "gold" : "lightgray"} // Stelle piene o vuote basate sul rating normalizzato
          size={20}
        />
      );
    }
    return stars;
  };

  // Funzione per scorrere verso l'alto
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTitleClick = () => {
    const firstCard = document.querySelector(".card");
    if (firstCard) {
      firstCard.classList.add("hover");
      setTimeout(() => {
        firstCard.classList.remove("hover"); // Rimuove la classe "hover" dopo 1 secondo
      }, 1000);
    }
  };

  return (
    <main className="homepage-main">
      {/* Titolo della pagina */}
      <div className="text-center">
        <h1 className="homepage-title" onClick={handleTitleClick}>
          Recensioni
        </h1>
      </div>
      <div className="container mt-5">
        <div className="row">
          {/* Mappa le recensioni per creare un rendering diretto */}
          {reviews.map((review) => (
            <AppCard
              key={review.id}
              review={review}
              navigate={navigate}
              renderStars={renderStars}
            />
          ))}
        </div>
        {/* Pulsante per caricare più recensioni */}
        {hasMore && (
          <div className="text-center mt-4">
            <button className="btn btn-outline-primary" onClick={loadMoreReviews}>
              Carica più recensioni
            </button>
          </div>
        )}
        {/* Pulsante per tornare all'inizio, visibile solo dalla seconda pagina */}
        {currentPage > 1 && (
          <div className="text-center mt-4">
            <button className="btn btn-outline-secondary" onClick={scrollToTop}>
              Torna all'inizio
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;