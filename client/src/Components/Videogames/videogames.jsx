import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./videogame.module.css";
import Pagination from "../Pagination/pagination";

function Videogames({ start, setStart, currentPage, setCurrentPage }) {
  const videogames = useSelector((state) => state.videogames);
  const allVideogames = useSelector((state) => state.videogamesBackUp);

  const quantity = 15;
  const gamesDisplayed = videogames.slice(start, start + quantity);

  return (
    <>
      <div className={style.cards}>
        {!allVideogames.length ? (
          <div className={style.loading}>
            <span className={style.loadingInner}>Loading...</span>
          </div>
        ) : !videogames.length ? (
          <div className={style.loading}>
            <span className={style.loadingInner}>Games not found</span>
          </div>
        ) : (
          gamesDisplayed.map((games) => {
            return (
              <div className={style.game} key={games.id}>
                <img
                  className={style.image}
                  src={games.image}
                  alt={games.name}
                />
                <div className={style.text}>
                  <Link to={`/detail/${games.id}`}>
                    <h3 className={style.name}>{games.name}</h3>
                  </Link>
                  <div>
                    {games.genres.map((genre, i) => (
                      <>
                        <span key={i}>{genre}</span>{" "}
                        {i < games.genres.length - 1 && "   "}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {!videogames.length ? (
        ""
      ) : (
        <Pagination
          quantity={quantity}
          start={start}
          setStart={setStart}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default Videogames;
