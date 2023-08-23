import { Link } from "react-router-dom";
import style from "./videogame.module.css";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { allGames } from "../../store/actions";
import { clean } from "../../store/videogamesSlice";


function Videogames({genre, platform}: {genre:string | undefined, platform:string | undefined }) {
  const lastDivRef = useRef(null)
  const numRef = useRef(0)
  const dispatch = useAppDispatch()
  const {name, videogames} = useAppSelector(state => state.videogames)
  
  
  useEffect(() => {
    const observed = new IntersectionObserver((entries) => {    
      if(entries[0].isIntersecting || name || genre || platform) {
        let page = numRef.current += 1;      
        dispatch(allGames({name, genre, platform, page}))        
      }
    },{rootMargin: '250px'})
    lastDivRef.current && observed.observe(lastDivRef.current)
    
    return () => {
      observed.disconnect()
      dispatch(clean())
      numRef.current = 0
    }
  }, [name, genre, platform])
  

  return (
    <>
      <div className={style.cards}>
        {!videogames.length ? (
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
      {<div ref={lastDivRef}></div>}
    </>
  );
}

export default Videogames;
