import React, { useState } from 'react';
import axios from 'axios';

function Movie({ movie, onAddToWatchlist, onRemoveFromWatchlist }) {
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState(null);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=2adfdb3a`);
            setDetails(response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const toggleDetails = () => {
        if (!showDetails && !details) {
            fetchDetails();
        }
        setShowDetails(!showDetails);
    };

    return (
        <div className="movie">
            <img src={movie.Poster} alt={`${movie.Title} poster`} onClick={toggleDetails} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {onAddToWatchlist && <button onClick={onAddToWatchlist}>Add to Watchlist</button>}
            {onRemoveFromWatchlist && <button onClick={onRemoveFromWatchlist}>Remove from Watchlist</button>}
            {showDetails && details && (
                <div className="movie-details">
                    <p><strong>Plot:</strong> {details.Plot}</p>
                    <p><strong>Director:</strong> {details.Director}</p>
                    <p><strong>Actors:</strong> {details.Actors}</p>
                </div>
            )}
        </div>
    );
}

export default Movie;