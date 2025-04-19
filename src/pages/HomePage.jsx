import axios from "axios";
import { useEffect, useState } from "react";
// Importa useLocation per ottenere la query di ricerca
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaArrowDown, FaArrowUp } from "react-icons/fa";
import AppCard from "../components/AppCard";

function HomePage() {
  // Stato per memorizzare le recensioni ottenute dall'API
  const [reviews, setReviews] = useState([]);
  // Hook per la navigazione Utilizza useNavigate per navigare tra le pagine
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Stato per la pagina corrente
  const [hasMore, setHasMore] = useState(true); // Stato per verificare se ci sono più pagine
  const [isLoading, setIsLoading] = useState(false); // Flag per evitare richieste duplicate
  const [isDarkMode, setIsDarkMode] = useState(false); // Stato per il tema scuro
  const [selectedGenre, setSelectedGenre] = useState(""); // Stato per il filtro del genere
  const [selectedPlatform, setSelectedPlatform] = useState(""); // Stato per il filtro della piattaforma

  // Ottieni la posizione corrente
  const location = useLocation();
  // Estrai i parametri della query dalla posizione corrente
  const searchParams = new URLSearchParams(location.search);
  // Ottieni la query di ricerca
  const searchQuery = searchParams.get("search") || "";
  // Ottieni il genere dalla query string
  const genreQuery = searchParams.get("genre") || "";
  const platformQuery = searchParams.get("platform") || "";
  useEffect(() => {
    setSelectedGenre(genreQuery); // Aggiorna il genere selezionato dallo stato della query string
  }, [genreQuery]);
  useEffect(() => {
    setSelectedPlatform(platformQuery); // Aggiorna la piattaforma selezionata dallo stato della query string
  }, [platformQuery]);

  useEffect(() => {
    // Scorre la pagina verso l'alto all'inizio
    window.scrollTo(0, 0);

    // Recupera le recensioni dall'API solo se non sono già state caricate
    if (!isLoading && reviews.length === 0) {
      setIsLoading(true); // Imposta il flag per indicare che i dati stanno per essere caricati
      getReviews();
    }
  }, []); // Assicurati che l'array di dipendenze sia vuoto per evitare richiami multipli

  // Gestione della query di ricerca
  // Effettua una nuova ricerca quando la query cambia
  useEffect(() => {
    setSelectedGenre(genreQuery); // Aggiorna il genere selezionato dallo stato della query string
    setReviews([]); // Resetta le recensioni per una nuova ricerca
    setCurrentPage(1); // Resetta la pagina corrente
    getReviews(1, searchQuery, genreQuery, platformQuery); // Passa la query di ricerca, il genere e la piattaforma alla funzione getReviews
  }, [searchQuery, genreQuery, platformQuery]); // Aggiungi genreQuery come dipendenza

  // Funzione per ottenere la lista delle recensioni dall'API
  const getReviews = (page = 1, query = "", genre = "", platform = "") => {
    if (isLoading) return; // Evita chiamate duplicate
    setIsLoading(true); // Imposta il flag per indicare che i dati stanno per essere caricati

    // Costruisci correttamente la query string
    const genreFilter = genre ? `&genre=${encodeURIComponent(genre)}` : "";
    const platformFilter = platform ? `&platform=${encodeURIComponent(platform)}` : "";
    const searchFilter = query ? `&search=${encodeURIComponent(query)}` : "";
    const url = `http://127.0.0.1:8000/api/reviews?page=${page}${searchFilter}${genreFilter}${platformFilter}`;

    axios
      .get(url)
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

        console.log("Recensioni caricate:", newReviews);
      })
      .catch((error) => {
        // Reimposta il flag in caso di errore
        setIsLoading(false);

        console.log("Errore durante il caricamento delle recensioni:", error);
      });
  };

  // Funzione per caricare più recensioni
  const loadMoreReviews = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getReviews(nextPage, searchQuery, selectedGenre, selectedPlatform); // Passa la piattaforma alla funzione getReviews

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

  // Funzione per attivare/disattivare il tema scuro
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Aggiunge o rimuove la classe "dark-mode" al body
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Funzione per aggiornare il filtro del genere
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    const query = `?search=${encodeURIComponent(searchQuery)}&genre=${encodeURIComponent(genre)}&platform=${encodeURIComponent(selectedPlatform)}`;
    navigate(`/api/reviews/${query}`); // Aggiorna la query string con il filtro di genere
  };

  return (
    <main className="homepage-main container-fluid">
      {/* Titolo della pagina */}
      <div className="mt-5 mb-4">
        <div className="display-5" onClick={handleTitleClick}>
          Le recensioni più recenti:
        </div>
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
          <div className="text-center m-1">
            <button className="btn btn-outline-primary" onClick={loadMoreReviews}>
              <FaArrowDown size={20} /> {/* Icona della freccia */}
            </button>
          </div>
        )}
        {/* Pulsante per tornare all'inizio, visibile solo dalla seconda pagina */}
        {currentPage > 1 && (
          <button
            className="btn btn-outline-success"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
            }}
          >
            <FaArrowUp size={20} /> {/* Icona della freccia verso l'alto */}
          </button>
        )}
      </div>
    </main>
  );
}

export default HomePage;