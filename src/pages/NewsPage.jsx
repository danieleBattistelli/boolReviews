// Definizione del componente NewsPage
function NewsPage() {

    // Ritorna il layout della pagina News
    return (
        <main className="homepage-main container-fluid">
            <div>
                {/* Titolo della pagina */}
                <h1>News Page</h1>

                {/* Descrizione della pagina */}
                <p>This is the news page.</p>
            </div>

            <div className="news-section">
                {/* Sottotitolo della sezione */}
                <h2 className="section-title">Latest News</h2>

                {/* Contenuto della sezione */}
                <p>Stay tuned for the latest updates and news.</p>
            </div>
        </main>
    );
}

// Esporta il componente per l'utilizzo in altre parti dell'applicazione
export default NewsPage;