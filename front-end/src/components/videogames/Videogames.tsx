import { Link } from "react-router-dom";
import style from "./videogame.module.css";
import { useAppSelector } from "../../hooks/redux.hooks";

function Videogames() {
  const videogames = useAppSelector((state) => state.videogames.videogames);
  
  const allVideogames = useAppSelector((state) => state.videogames.videogamesBackup);

  
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
          videogames.map((games) => {
            return (
              <div className={style.game} key={games.id}>
                {typeof games.image === "string" && (
                  <img
                    className={style.image}
                    src={games.image}
                    alt={games.name}
                  />
                )}
                <div className={style.text}>
                  <Link to={`/detail/${games.id}`}>
                    <h3 className={style.name}>{games.name}</h3>
                  </Link>
                  <div>
                    {games.genres.map((genre, i) => (
                      <div key={genre}>
                        <span key={i}>{genre}</span>{" "}
                        {i < games.genres.length - 1 && "   "}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Videogames;
