import axios from "axios";
import { useEffect, useState } from "react";
import { Movies } from "../../Interfaces/Movies";
import Movie from "../../Components/Movie/Movie";

export default function Watched() {
    const [movies, setMovies] = useState<Movies[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        getMovieType("upcoming");
    }, []);
    async function getMovieType(id: string) {
        try {
            const apiKey = '022d947f494d43f179c4fc1e06d8f3ab';
            let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
            if (searchValue) {
                url += `&query=${searchValue}`;
            }
            let response = await axios.get(url);
            setMovies(response.data.results);
            console.log(response.data.results);

        } catch (error) {
            console.error(error);
        }
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }
    function cutText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    return (
        <>
            <h2>Upcoming movies ... You can watch your favorite movie so soon :) </h2>
            <div className='search-container'>
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search movies, star or tv shows"
                    className="search-input"
                />
            </div>
            <div className='movie-list'>
                {/* {movies}     */}

                {/* <img src={`https://image.tmdb.org/t/p/w300/${movies.backdrop_path}`} /> */}
                {movies.filter((movie) => {
                    const title = movie.original_title?.toLowerCase() || '';
                    const overview = movie.overview?.toLowerCase() || '';
                    const search = searchValue.toLowerCase();

                    // Vérifie si le titre ou l'aperçu contient la valeur de recherche
                    return title.includes(search) || overview.includes(search);
                })
                    .map((item, index) => (
                        <div className="movie-item" key={index}>
                            <img className="movie-img" src={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`} />
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
                    ))}
            </div>
        </>
    );
};