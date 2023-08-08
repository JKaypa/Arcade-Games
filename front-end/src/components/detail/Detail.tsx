import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allGames, deleteGame, gameById } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import style from "./detail.module.css";
import { restart, restore } from "../../store/videogamesSlice";

function Detail() {
  const boolRef = useRef(true);
  const navigate = useNavigate();
  const message = useAppSelector((state) => state.videogames.message);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const isUuid = id && isNaN(Number(id));
  const details = useAppSelector((state) => state.videogames.videogameDetail);
  // const uuidRegex =
  //   /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  // // const isUuid = id && uuidRegex.test(id);

  useEffect(() => {
    id && dispatch(gameById(id));

    return () => {
      if (boolRef.current) {
        dispatch(restart());
      }
    };
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(restore());
    };
  }, [dispatch]);

  const handleUpdate = () => {
    boolRef.current = false;
    navigate(`/update/${id}`);
  };

  const handleDelete = () => {
    id && dispatch(deleteGame(id));
    dispatch(allGames({}));
  };

  return (
    <div className={style.flexContainer}>
      <div className={style.gridContainer}>
        {message ? (
          <span className={style.message}>{message}</span>
        ) : details ? (
          <>
            <div className={[style.name, style.titles].join(" ")}>
              <h1>{details.name}</h1>
            </div>
            {typeof details.image === "string" && (
              <img
                className={style.image}
                src={details.image}
                alt={details.name}
              />
            )}
            <div>
              <h3 className={style.titles}>Genres</h3>
              {details.genres && (
                <span>
                  {details.genres.map((genre, i) => (
                    <div key={genre}>
                      <span>
                        {genre}
                        {i < details.genres.length - 1 && ", "}
                      </span>
                    </div>
                  ))}
                </span>
              )}
            </div>
            <div>
              <h3 className={style.titles}>Platforms</h3>
              {details.platforms && (
                <span>
                  {details.platforms.map((plat, i) => (
                    <div key={plat}>
                      <span>
                        {plat}
                        {i < details.platforms.length - 1 && ", "}
                      </span>
                    </div>
                  ))}
                </span>
              )}
            </div>
            <div>
              <h3 className={style.titles}>Rating</h3>
              <span>{details.rating}</span>
            </div>
            <div>
              <h3 className={style.titles}>Released</h3>
              <span>{details.released}</span>
            </div>
            <div className={style.description}>
              <h3 className={style.titles}>Description</h3>
              <span
                className={style.text}
                dangerouslySetInnerHTML={{ __html: details.description }}
              />
            </div>

            {isUuid && (
              <div className={style.buttons}>
                <button className={style.update} onClick={handleUpdate}>
                  Update Game
                </button>
                <button className={style.delete} onClick={handleDelete}>
                  Delete Game
                </button>
              </div>
            )}
          </>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}

export default Detail;
