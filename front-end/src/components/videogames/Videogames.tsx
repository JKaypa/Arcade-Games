import { Link } from "react-router-dom";
import style from "./videogame.module.css";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { allGames } from "../../store/actions";
import { clean } from "../../store/videogamesSlice";

axios.defaults.baseURL = "http://localhost:3001/api/videogames";


function Videogames() {

  const lastDivRef = useRef(null)
  const numRef = useRef(0)
  const dispatch = useAppDispatch()
  const {name, videogames} = useAppSelector(state => state.videogames)

  useEffect(() => {
    const observed = new IntersectionObserver((entries) => {    
      let page;  
      if(entries[0].isIntersecting || name) {
        page = numRef.current += 1;
        console.log(page);        
        dispatch(allGames({page, name}))
      }
    })
    lastDivRef.current && observed.observe(lastDivRef.current)

    return () => {
      observed.disconnect()
      dispatch(clean())
      numRef.current = 0
    }
  }, [name])

  console.log(name);
  

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
