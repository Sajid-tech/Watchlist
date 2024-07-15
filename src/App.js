// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth';
import { WatchlistProvider } from './watchlist';
import Login from './components/Login';
import Signup from './components/Signup';
import MovieSearch from './components/MovieSearch';
import Watchlist from './components/Watchlist';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/search"
                element={
                  <PrivateRoute>
                    <MovieSearch />
                  </PrivateRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <PrivateRoute>
                    <Watchlist />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </WatchlistProvider>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;