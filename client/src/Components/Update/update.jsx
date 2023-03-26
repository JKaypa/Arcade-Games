import Form from "../Form/form";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allGames, gameById, restore, updateGame } from "../../Redux/Actions";
import style from "./update.module.css";

function Update() {
  const previousMessage = useRef(null);
  const message = useSelector((state) => state.message);
  const details = useSelector((state) => state.videogameDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(gameById(id));
  }, []);

  useEffect(() => {
    setForm({
      name: details.name,
      image: details.image,
      genres: details.genres,
      platforms: details.platforms,
      rating: details.rating,
      released: details.released,
      description: details.description,
    });
  }, [details]);

  console.log(details);
  console.log(form);

  useEffect(() => {
    if (message && message !== previousMessage.current) {
      alert(message);
      previousMessage.current = message;
    }
    return () => {
      dispatch(restore());
    };
  }, [message]);

  const handleEdit = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [name]: form[name].filter((elem) => elem !== value),
    });
  };

  const handleForm = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "rating" && value > 0 && value <= 5) {
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

  const handleImg = (event) => {
    const file = event.target.files[0];
    setForm({
      ...form,
      image: file,
    });
  };

  const handleOptions = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (form[name].includes(value)) return;
    setForm({
      ...form,
      [name]: [...form[name], value],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("image", form.image);
    data.append("genres", [...form.genres]);
    data.append("platforms", [...form.platforms]);
    data.append("released", form.released);
    data.append("description", form.description);
    data.append("rating", form.rating);
    dispatch(updateGame(id, data));
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
