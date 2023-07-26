import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux.hooks";
import { NavLink } from "react-router-dom";
import { allGames } from "../../store/actions";
import style from "./Navbar.module.css";

function Navbar() {
  const [name, setName] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useAppDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    dispatch(allGames(name));
    setName(name);
  };

  const active = ({ isActive }:{isActive: boolean}) => (isActive ? style.active : style.links);

  const toggleActive = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className={style.navbar}>
        <img className={style.logo} src="/logo.png" alt="logo" />
        <input
          className={style.input}
          type="text"
          value={name}
          placeholder="Search by name"
          onChange={handleSearch}
        />
        <NavLink to="home" className={active}>
          Home
        </NavLink>
        <NavLink to="create" className={active}>
          Save your videogame
        </NavLink>
      </div>

      <div className={toggle ? style.openMenu : style.resNav}>
        <div className={style.main}>
          <img className={style.logo} src="/logo.png" alt="logo" />
          <button
            onClick={toggleActive}
            className={toggle ? style.burgerAct : style.burgerDis}
          >
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        {toggle && (
          <div className={style.menu}>
            <input
              className={style.input}
              type="text"
              value={name}
              placeholder="Search by name"
              onChange={handleSearch}
            />
            <NavLink to="home" className={active}>
              Home
            </NavLink>
            <NavLink to="create" className={active}>
              Save your videogame
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
