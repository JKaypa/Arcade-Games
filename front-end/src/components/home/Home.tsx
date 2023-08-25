import { useEffect, useState } from "react";
import Genres from "../genres/Genres";
import Platforms from "../platforms/Platforms";
import Videogames from "../videogames/Videogames";
import style from "./home.module.css";

function Home() {
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [rating, setRating] = useState("");
  const genreItem = localStorage.getItem('genre')
  const platformItem = localStorage.getItem('platform')
  const ratingItem = localStorage.getItem('rating')

  useEffect(() => {
    genreItem && setGenre(genreItem)
    platformItem && setPlatform(platformItem)
    ratingItem && setRating(ratingItem)
  }, [])
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    if (name === "genres"){ 
      setGenre(value)
      localStorage.setItem('genre', value)
    }
    else if (name === 'platforms'){
      setPlatform(value)
      localStorage.setItem('platform', value)
    }
    else{
      setRating(value)
      localStorage.setItem('rating', value)
    }
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
            name="rating"
            value={rating}
            onChange={handleChange}
          >
            <option value="">Order by rating</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
        <Videogames genre={genre} platform={platform} rating={rating}/>
      </div>
    </>
  );
}

export default Home;
