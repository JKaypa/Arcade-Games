import { useEffect, useRef, useState } from "react";
import { allGames, createGame } from "../../store/actions";
import Form from "../form/Form";
import style from "./create.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { restore } from "../../store/videogamesSlice";
import { Videogame } from "../../types";

function Create() {
  const previousMessage = useRef("");
  const message = useAppSelector((store) => store.videogames.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message && message !== previousMessage.current) {
      alert(message);
      previousMessage.current = message;
    }
    return () => {
      dispatch(restore());
    };
  }, [message, dispatch]);

  const [form, setForm] = useState<Videogame>({
    name: "",
    image: '',
    genres: [],
    platforms: [],
    rating: "",
    released: "",
    description: "",
  });

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    const { name, value } = button;
    if (name === "genres")
      setForm({
        ...form,
        genres: form.genres.filter((genre) => genre !== value),
      });
    else if (name === "platform")
      setForm({
        ...form,
        platforms: form.platforms.filter((plat) => plat !== value),
      });
  };

  const handleForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    // const isNum = (data: string) => !isNaN(parseInt(data))

    if (name === "rating" && typeof value === "number") {
      value > 0 && value <= 5
        ? setForm({ ...form, rating: value })
        : alert("rating must be a number between 1 to 5");
    } else if (name !== "rating") {
      type key = keyof typeof form;
      const prop = name as key;
      setForm({
        ...form,
        [prop]: value,
      });
    }
  };

  const handleImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    file && setForm({ ...form, image: file });
  };

  const handleOptions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "genres")
      form.genres.includes(value)
        ? alert("Genre already chosen")
        : setForm({ ...form, genres: [...form.genres, value] });
    else if (name === "platforms")
      form.platforms.includes(value)
        ? alert("Platform already chosen")
        : setForm({ ...form, platforms: [...form.platforms, value] });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields: string[] = Object.values(form);
    if (fields.some((filed) => filed.length === 0))
      return alert(
        "All fields are required. Please check carefully and fill them up."
      );
    const data = new FormData();
    data.append("name", form.name);
    data.append("image", form.image);
    data.append("genres", JSON.stringify(form.genres));
    data.append("platforms", JSON.stringify(form.platforms));
    data.append("released", form.released);
    data.append("description", form.description);
    data.append("rating", form.rating);

    dispatch(createGame(data));
    dispatch(allGames());
    setForm({
      name: "",
      image: '',
      genres: [],
      platforms: [],
      released: "",
      description: "",
      rating: "",
    });
  };

  return (
    <div className={style.form}>
      <h1 className={style.title}>Create your Videogame</h1>
      <Form
        name={form.name}
        image={form.image}
        genres={form.genres}
        platforms={form.platforms}
        released={form.released}
        description={form.description}
        rating={form.rating}
        handleEdit={handleEdit}
        handleForm={handleForm}
        handleOptions={handleOptions}
        handleImg={handleImg}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Create;
