import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, order } from "../../Redux/Actions";
import Genres from "../Genres/genres";
import Platforms from "../Platforms/platforms";
import Videogames from "../Videogames/videogames";
import style from "./home.module.css";

function Home() {
  const [genres, setGenres] = useState("");
  const [platforms, setPlatforms] = useState("");
  const [store, setStore] = useState("");
  const [alph, setAlph] = useState("");
  const [rating, setRating] = useState("");
  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch();
  const render = true;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "genres" || name === "platforms" || name === "store") {
      const options = value ? { name, value } : undefined;
      options && dispatch(filter(options));
    } else value && dispatch(order(value));

    name === "alph" ? setAlph(value) : setAlph("");
    name === "rating" ? setRating(value) : setRating("");
    name === "genres" ? setGenres(value) : setGenres("");
    name === "platforms" ? setPlatforms(value) : setPlatforms("");
    name === "store" ? setStore(value) : setStore("");

    setStart(0)
    setCurrentPage(1)

  };

  return (
    <>
    <div className={style.bigContainer}>
      <div className={style.filters}>
        <Genres
          handleChange={handleChange}
          genres={genres}
          render={render}
        />
        <Platforms
          handleChange={handleChange}
          platforms={platforms}
          render={render}
        />
        <select className={style.buttons} name="store" value={store} onChange={handleChange}>
          <option value="">Filter by storage</option>
          <option value="database">Database</option>
          <option value="api">API</option>
          <option value="All">All</option>
        </select>
        <select
          className={style.buttons}
          name="alph"
          value={alph}
          onChange={handleChange}
        >
          <option value="">Order alphabetically</option>
          <option value="a-z">A -{">"} Z</option>
          <option value="z-a">Z -{">"} A</option>
        </select>
        <select
          className={style.buttons}
          name="rating"
          value={rating}
          onChange={handleChange}
        >
          <option value="">Order by rating</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <Videogames  start={start} setStart={setStart} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
    </>
    
  );
}

export default Home;
