import style from './platforms.module.css'

function Platforms({ handleChange, render, platforms }) {
  return (
    <div>
      <select className={style.platforms} name="platforms" value={platforms} onChange={handleChange} >
      {render && <option value="">Filter by platform</option>}
        <option value="PC">PC</option>
        <option value="PlayStation 5">PlayStation 5</option>
        <option value="PlayStation 4">PlayStation 4</option>
        <option value="PlayStation 3">PlayStation 3</option>
        <option value="PlayStation 2">PlayStation 2</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Xbox Series S/X">Xbox Series S/X</option>
        <option value="Xbox One">Xbox One</option>
        <option value="Xbox 360">Xbox 360</option>
        <option value="Xbox">Xbox</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="Nintendo 3DS">Nintendo 3DS</option>
        <option value="Nintendo DS">Nintendo DS</option>
        <option value="Nintendo DSi">Nintendo DSi</option>
        <option value="Wii U">Wii U</option>
        <option value="Wii">Wii</option>
        <option value="GameCube">GamesCube</option>
        <option value="Nintendo 64">Nintendo 64</option>
        <option value="SNES">SNES</option>
        <option value="NES">NES</option>
        <option value="iOS">iOS</option>
        <option value="Linux">Linux</option>
        {render && <option value="All">All</option>}
      </select>
    </div>
  );
}

export default Platforms;