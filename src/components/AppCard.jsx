import { FaStar, FaArrowDown, FaArrowRight } from "react-icons/fa"; // Importa l'icona delle stelle e della freccia

// Funzione per calcolare i giorni dalla data fornita
function calculateDaysFromToday(dateString) {
    const reviewDate = new Date(dateString);
    const today = new Date();
    const differenceInTime = today - reviewDate;
    return Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Converti millisecondi in giorni
}

// Componente per rappresentare una singola recensione
function AppCard({ review, navigate, renderStars }) {
    return (
        <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card h-90">
                <div className="card-body text-center">
                    <h3 className="card-title fixed-height-title">{review.gametitle}</h3>
                    <strong className="card-subtitle">
                        <p className="card-subtitle mb-2 mt-3">
                            {calculateDaysFromToday(review.reviewDate)} giorni fa
                        </p>
                    </strong>
                    <img
                        src={`http://127.0.0.1:8000/storage/${review.image}`}
                        className="card-img-top fixed-size-img mb-3"
                        alt={`${review.gametitle} logo`}
                    />
                    <h3 className="card-text fixed-height-text">
                        <strong>{review.reviewTitle}</strong>
                    </h3>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/api/reviews/${review.id}`)}
                    >
                        <FaArrowRight size={20} /> {/* Icona della freccia */}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppCard;