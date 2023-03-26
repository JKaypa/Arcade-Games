import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allGames, createGame, restore } from "../../Redux/Actions";
import Form from "../Form/form";
import style from "./create.module.css";

function Create() {
  const previousMessage = useRef(null);
  const message = useSelector((state) => state.message);

  useEffect(() => {
    if (message && message !== previousMessage.current) {
      alert(message);
      previousMessage.current = message;
    }
    return () => {
      dispatch(restore());
    };
  }, [message]);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    image: "",
    genres: [],
    platforms: [],
    rating: "",
    released: "",
    description: "",
  });

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
      return
    } if (name === 'rating') {
      alert('rating most be a number between 1 to 5')
    }
    else if (name !== "rating") {
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
    if (form[name].includes(value)) return alert('You can not repeat genres or platforms'); 
    setForm({
      ...form,
      [name]: [...form[name], value],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = Object.values(form);
    if (fields.some((filed) => filed.length === 0))
      return alert(
        "All fields are required. Please check carefully and fill them up."
      );
    const data = new FormData();
    data.append("name", form.name);
    data.append("image", form.image);
    data.append("genres", [...form.genres]);
    data.append("platforms", [...form.platforms]);
    data.append("released", form.released);
    data.append("description", form.description);
    data.append("rating", form.rating);
    dispatch(createGame(data));
    dispatch(allGames());
    setForm({name:'', image: '', genres: [], platforms: [], released: '', description: '', rating: ''})
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
