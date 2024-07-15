import React from 'react';
import { useAuth } from '../auth';
import { useWatchlist } from '../watchlist';
import Movie from './Movie';

function Watchlist() {
    const { currentUser } = useAuth();
    const { watchlist, removeFromWatchlist } = useWatchlist();

    return (
        <div className="watchlist">
            <h2>Your Watchlist</h2>
            <div className="movies-grid">
                {watchlist[currentUser]?.map((movie) => (
                    <Movie
                        key={movie.imdbID}
                        movie={movie}
                        onRemoveFromWatchlist={() => removeFromWatchlist(currentUser, movie.imdbID)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Watchlist;