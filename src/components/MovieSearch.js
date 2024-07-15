import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth';
import { useWatchlist } from '../watchlist';
import Movie from './Movie';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const { currentUser } = useAuth();
    const { addToWatchlist } = useWatchlist();

    const searchMovies = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=2adfdb3a`);
            if (response.data.Search) {
                setMovies(response.data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    return (
        <div className="movie-search">
            <h2>Search Movies</h2>
            <div className="search-bar">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title"
                />
                <button onClick={searchMovies}>Search</button>
            </div>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <Movie
                        key={movie.imdbID}
                        movie={movie}
                        onAddToWatchlist={() => addToWatchlist(currentUser, movie)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;