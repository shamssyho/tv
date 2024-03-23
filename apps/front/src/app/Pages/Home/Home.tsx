import { useEffect, useState } from "react";
import "./Home.css"
import axios from 'axios';
import { Movies } from "../../Interfaces/Movies";
import Movie from "../../Components/Movie/Movie";
import ItemMenu from "../../Components/Menu/ItemMenu";
import Search from "../../Components/Search/Search";
import { Link } from "react-router-dom";

export default function Home() {

    const [movies, setMovies] = useState<Movies[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');


    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjJkOTQ3ZjQ5NGQ0M2YxNzljNGZjMWUwNmQ4ZjNhYiIsInN1YiI6IjY1ZjlhNzZiMzkxYjljMDE3YmM5MDFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l8QsakeQ7_BA-dZQX5p_h-LhqoTxv519qg0mUsWJzGo"

    useEffect(() => {
        getMovieType("all");
    }, []);


    async function getMovieType(type: string) {
        try {
            const apiKey = '022d947f494d43f179c4fc1e06d8f3ab';
            // const apiKey = process.env.REACT_APP_API_KEY;
            console.log("🚀 ~ getMovieType ~ apiKey:", apiKey)

            let url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${apiKey}&media_type=movie`;
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

    return (
        <>
            <div className='search-container'>
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search movies, star or tv shows"
                    className="search-input"
                />
            </div>
            {/* <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul> */}
            <div className="container">
                <div className="filter">
                    <ItemMenu handleType={() => getMovieType("all")} title="Trending All" />
                    <ItemMenu handleType={() => getMovieType("movie")} title="Trending Movies" />
                    <ItemMenu handleType={() => getMovieType("tv")} title="Trending TV" />
                    <ItemMenu handleType={() => getMovieType("person")} title="Trending People" />
                </div>
                <div className='movie-list'>
                    {movies.filter((movie) => {
                        const title = movie.original_title?.toLowerCase() || '';
                        const search = searchValue.toLowerCase();

                        return title.includes(search);
                    })
                        .map((item, index) => (
                            <div className="movie-item" key={index}>
                                <Movie item={item} />
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};