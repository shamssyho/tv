import React from "react";
import { Movies } from "../../Interfaces/Movies";
import './Movie.css'
import { Link } from "react-router-dom";

interface MovieProps {
    item: Movies;
}

const Movie: React.FC<MovieProps> = ({ item }) => {
    function cutText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }
    return (
        <div className="movie-item">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <div className="container-item">
                <p>popularity : {item.popularity}</p>
                <img className="movie-img" src={`https://image.tmdb.org/t/p/w300/${item.poster_path ? item.poster_path : item.profile_path}`} />
            </div>
            <div className="movie-name">
                <h2>
                    {cutText(item.original_title ? item.original_title : item.original_name, 22)}
                </h2>
                {item.overview ? (
                    <p>{cutText(item.overview, 130)}</p>
                ) : (
                    <p>Known for: {item.known_for_department}</p>
                )}
            </div>
        </div>
    );
};

export default Movie;
