import MovieList from "./MovieList"
import { useState, useEffect } from "react";
function Home() {

    function commentAdder(newMovie, id) {
        data.map(movie => {
            if (movie.id === id) {
                movie.comment = newMovie.userComment;
                return movie
            }
            else
                return movie
        })
        console.log('from home', data)
    }
    const [data, setData] = useState([]);
    async function getTtrendingMovies() {
        const url = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(`${url}/trending`);
        const movies = await response.json();
        console.log(movies)
        setData(movies);
    }

    useEffect(() => {
        getTtrendingMovies()
    }, [])

    return (
        <>
            <h2>Welcome in Home</h2>
            <MovieList commentAdder={commentAdder} data={data} />
        </>
    )
}

export default Home