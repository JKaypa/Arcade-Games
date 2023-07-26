import Form from "../form/Form";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { allGames, gameById, updateGame } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { restore } from "../../store/videogamesSlice";
import style from "./update.module.css";
import { Videogame } from "../../types";



function Update() {
  const previousMessage = useRef('');
  const message = useAppSelector((state) => state.videogames.message);
  const details = useAppSelector((state) => state.videogames.videogameDetail);
  const dispatch = useAppDispatch();
  const { id } = useParams()
  const [form, setForm] = useState<Videogame>({
    name: "",
    image: '',
    genres: [],
    platforms: [],
    rating: "",
    released: "",
    description: "",
  });

  useEffect(() => {
    id && dispatch(gameById(id));
  }, [dispatch, id]);

  useEffect(() => {
    details && setForm({
      name: details.name,
      image: details.image,
      genres: details.genres,
      platforms: details.platforms,
      rating: details.rating,
      released: details.released,
      description: details.description,
    });
  }, [details]);

  useEffect(() => {
    if (message !== previousMessage.current) {
      alert(message);
      previousMessage.current = message;
    }
    return () => {
      dispatch(restore());
    };
  }, [message, dispatch]);

  const handleEdit = (event:  React.MouseEvent<HTMLButtonElement>) => {
    const {name, value} = event.target as HTMLButtonElement;

    type key = keyof typeof form;
    const prop = name as key
    const values = form[prop]
    if(Array.isArray(values)) 
        setForm({...form, [prop]: values.filter(elem => elem !== value)})
    
  };

  const handleForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    if (name === "rating" && parseInt(value) > 0 && parseInt(value) <= 5) {
      setForm({
        ...form,
        [name]: value,
      });
    } else if (name !== "rating") {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    file && setForm({
      ...form,
      image: file,
    });
  };

  const handleOptions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    
    type key = keyof typeof form
    const prop = name as key
    
    const values = form[prop]
    
    if (Array.isArray(values)){
      !values.includes(value) &&
      setForm({...form, [prop]: [...values, value]})
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const game = new FormData();
    game.append("name", form.name);
    game.append("image", form.image);
    game.append("genres", JSON.stringify(form.genres));
    game.append("platforms", JSON.stringify(form.platforms));
    game.append("released", form.released);
    game.append("description", form.description);
    game.append("rating", form.rating);
    
    id && dispatch(updateGame({id, game}));
    dispatch(allGames());
  };

  return (
    <div className={style.update}>
      <h1 className={style.title}>Update your Videogame</h1>
      <Link className={style.back} to={`/detail/${id}`}>
        <span>Back to Details</span>
      </Link>
      {form.genres && (
        <Form
          handleEdit={handleEdit}
          handleForm={handleForm}
          handleImg={handleImg}
          handleOptions={handleOptions}
          handleSubmit={handleSubmit}
          name={form.name}
          image={form.image}
          genres={form.genres}
          platforms={form.platforms}
          released={form.released}
          description={form.description}
          rating={form.rating}
        />
      )}
    </div>
  );
}

export default Update;
