import React, { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export function useWatchlist() {
    return useContext(WatchlistContext);
}

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || {});

    const addToWatchlist = (user, movie) => {
        const updatedWatchlist = { ...watchlist, [user]: [...(watchlist[user] || []), movie] };
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
    };

    const removeFromWatchlist = (user, movieId) => {
        const updatedWatchlist = {
            ...watchlist,
            [user]: watchlist[user].filter((movie) => movie.imdbID !== movieId),
        };
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}
