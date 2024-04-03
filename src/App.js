import React, { useState, useEffect } from "react";
import './App.css'
import SearchIcon from './search.svg'
import MovieDetail from "./MovieDetail";

const API_URL = 'https://www.omdbapi.com?apikey=c6a55e48';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMovies(data.Search);
        } catch (error) {
            console.error('Error fetching movies:', error);
            // Handle error state here
        }
    }

    useEffect(() => {
        searchMovies('Doraemon');
    }, []);

    const handleSearch = () => {
        searchMovies(searchWord);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="app">
            <h1><span className="increased-size">Film</span> <span className="logo">N</span>estle</h1>

            <div className="search">
                <input
                    placeholder="Search Movies"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={handleSearch}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie, index) => (
                        <MovieDetail key={index} movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>We have found no movies</h2>
                </div>
            )}
        </div>
    );
};

export default App;
