import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./landing.module.css";

function Landing() {
  const navigate = useNavigate();
  const videogames = useSelector((state) => state.videogames);
  console.log(videogames);

  const handleClick = () => {
    navigate("home");
  };

  return (
    <div className={style.landing}>
      <div className={style.content}> 
        <p className={[style.text, style.welcome].join(' ')}>Welocome to...</p>
        <img className={style.logo} src='logo.png' alt=''/>
        <p className={style.text}>The geatest place where you can find, create and edit all your favorites videogames.</p>
        <br></br>
        <p className={style.text}>Let's take a look and have fun!</p>
      </div>      
      <button  className={style.button} onClick={handleClick}>Let's get start it</button>
    </div>
  );
}

export default Landing;
