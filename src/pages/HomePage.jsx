// Importa le librerie necessarie
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import AppCard from "../components/AppCard";

// Definizione del componente HomePage
function HomePage() {

  // Stati per gestire i dati e il comportamento della pagina
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const genreQuery = searchParams.get("genre") || "";
  const platformQuery = searchParams.get("platform") || "";
  useEffect(() => {
    setSelectedGenre(genreQuery);
  }, [genreQuery]);
  useEffect(() => {
    setSelectedPlatform(platformQuery);
  }, [platformQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoading && reviews.length === 0) {
      setIsLoading(true);
      getReviews();
    }
  }, []);

  useEffect(() => {
    setSelectedGenre(genreQuery);
    setReviews([]);
    setCurrentPage(1);
    getReviews(1, searchQuery, genreQuery, platformQuery);
  }, [searchQuery, genreQuery, platformQuery]);

  // Funzione per ottenere le recensioni dal server
  const getReviews = (page = 1, query = "", genre = "", platform = "") => {
    if (isLoading) return;
    setIsLoading(true);

    // Costruisce l'URL con i filtri
    const genreFilter = genre ? `&genre=${encodeURIComponent(genre)}` : "";
    const platformFilter = platform ? `&platform=${encodeURIComponent(platform)}` : "";
    const searchFilter = query ? `&search=${encodeURIComponent(query)}` : "";
    const url = `http://127.0.0.1:8000/api/reviews?page=${page}${searchFilter}${genreFilter}${platformFilter}`;

    // Effettua la richiesta HTTP
    axios
      .get(url)
      .then((resp) => {
        const newReviews = resp.data.data.data;

        // Aggiorna lo stato con le nuove recensioni
        setReviews((prevReviews) => {
          const existingIds = new Set(prevReviews.map((review) => review.id));
          const filteredReviews = newReviews.filter(
            (review) => !existingIds.has(review.id)
          );
          return [...prevReviews, ...filteredReviews];
        });

        // Aggiorna lo stato per indicare se ci sono altre recensioni
        setHasMore(resp.data.data.next_page_url !== null);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  // Funzione per caricare altre recensioni
  const loadMoreReviews = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getReviews(nextPage, searchQuery, selectedGenre, selectedPlatform);

    // Scorre verso il basso dopo un breve ritardo
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 500);
  };

  // Funzione per tornare in cima alla pagina
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  // Ritorna il layout della pagina Home
  return (
    <main className="homepage-main container-fluid">
      <div className="mt-5 mb-4">
        <div className="display-5">
          Le recensioni più recenti:
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          {/* Mappa le recensioni in AppCard */}
          {reviews.map((review) => (
            <AppCard
              key={review.id}
              review={review}
              navigate={navigate}

            />
          ))}
        </div>

        {/* Bottone per caricare altre recensioni */}
        {hasMore && (
          <div className="text-center m-1">
            <button className="btn btn-outline-primary" onClick={loadMoreReviews}>
              <FaArrowDown size={20} />
            </button>
          </div>
        )}

        {/* Bottone per tornare in cima */}
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
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </main>
  );
}

// Esporta il componente per l'utilizzo in altre parti dell'applicazione
export default HomePage;