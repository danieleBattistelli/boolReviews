import { FaStar } from "react-icons/fa"; // Importa l'icona delle stelle

// Componente per rappresentare una singola recensione
function AppCard({ review, navigate, renderStars }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <div className="card-body text-center">
                    <h3 className="card-title">{review.gametitle}</h3>
                    <img
                        src={`http://127.0.0.1:8000/storage/${review.image}`}
                        className="card-img-top w-25"
                        style={{ height: "auto" }}
                        alt={`${review.gametitle} logo`}
                    />
                    <p className="card-text">
                        <strong>{review.genre.name}</strong>
                    </p>
                    <p className="card-text">
                        <strong>
                            {review.platforms
                                .map((platform) => (
                                    <span key={platform.id} style={{ color: platform.color }}>
                                        {platform.name}
                                    </span>
                                ))
                                .reduce((prev, curr) => [prev, ", ", curr])}
                        </strong>
                    </p>
                    <p className="card-text">
                        <strong>{review.reviewTitle}</strong>
                    </p>
                    <p className="card-text">
                        {/* Sostituisce il rating numerico con le stelle */}
                        {renderStars(review.rating)}
                    </p>
                    <p className="card-text">
                        <strong>{review.reviewerName}</strong>
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/reviews/${review.id}`)}
                    >
                        Leggi di più
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppCard;