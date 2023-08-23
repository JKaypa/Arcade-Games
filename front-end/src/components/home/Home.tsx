import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux.hooks";
import { order } from "../../store/videogamesSlice";
import Genres from "../genres/Genres";
import Platforms from "../platforms/Platforms";
import Videogames from "../videogames/Videogames";
import style from "./home.module.css";

function Home() {
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [alph, setAlph] = useState("");
  const [rating, setRating] = useState("");

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    if (name === "genres") setGenre(value)  
    else if (name === 'platforms') setPlatform(value)
    else value && dispatch(order(value));

  };

  return (
    <>
      <div className={style.bigContainer}>
        <div className={style.filters}>
          <Genres handleChange={handleChange} genres={genre} render={true} />
          <Platforms
            handleChange={handleChange}
            platforms={platform}
            render={true}
          />
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
        <Videogames genre={genre} platform={platform}/>
      </div>
    </>
  );
}

export default Home;
