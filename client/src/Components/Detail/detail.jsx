import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { allGames, deleteGame, gameById, restart, restore } from "../../Redux/Actions";
import style from "./detail.module.css";

function Detail() {
  const boolRef = useRef(true);
  const navigate = useNavigate();
  const message = useSelector((state) => state.message);
  const { id } = useParams();
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isUuid = uuidRegex.test(id);
  const dispatch = useDispatch();
  const details = useSelector((state) => state.videogameDetail);

  console.log(details);
  console.log(message);
  useEffect(() => {
    dispatch(gameById(id));

    return () => {
      if (boolRef.current) {
        dispatch(restart());
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(restore())
    }
  }, []) 

  const handleUpdate = () => {
    boolRef.current = false;
    navigate(`/update/${id}`);
  };

  const handleDelete = () => {
    dispatch(deleteGame(id));
    dispatch(allGames());
  };

  return (
    <div className={style.flexContainer}>
      <div className={style.gridContainer}>
        {message ? (
          <span className={style.message}>{message}</span>
        ) : (
          <>
            <div className={[style.name, style.titles].join(" ")}>
              <h1>{details.name}</h1>
            </div>
            <img
              className={style.image}
              src={details.image}
              alt={details.name}
            />
            <div>
              <h3 className={style.titles}>Genres</h3>
              {details.genres && (
                <span>
                  {details.genres.map((genre, i) => (
                    <>
                      {genre}
                      {i < details.genres.length - 1 && ", "}
                    </>
                  ))}
                </span>
              )}
            </div>
            <div>
              <h3 className={style.titles}>Platforms</h3>
              {details.platforms && (
                <span>
                  {details.platforms.map((plat, i) => (
                    <>
                      {plat}
                      {i < details.platforms.length - 1 && ", "}
                    </>
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
                <button className={style.update} onClick={handleUpdate}>Update Game</button>
                <button className={style.delete} onClick={handleDelete}>Delete Game</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
