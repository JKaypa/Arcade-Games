import { Props } from '../../types';
import style from './genres.module.css'



function Genres({ handleChange, render, genres }: Props) {
  return (
    <div>
      <select className={style.genres} name="genres"  value={genres} onChange={handleChange} >
      {render && <option value="">Filter by genre</option>}
        <option value="Action">Action</option>
        <option value="Indie">Indie</option>
        <option value="Adventure">Adventure</option>
        <option value="RPG">RPG</option>
        <option value="Strategy">Strategy</option>
        <option value="Shooter">Shooter</option>
        <option value="Casual">Casual</option>
        <option value="Simulation">Simulation</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Arcade">Arcade</option>
        <option value="Platformer">Platformer</option>
        <option value="Racing">Racing</option>
        <option value="Massively Multiplayer">Massively Multiplayer</option>
        <option value="Sports">Sports</option>
        <option value="Fighting">Fighting</option>
        <option value="Family">Family</option>
        <option value="Board Games">Board Games</option>
        <option value="Educational">Educational</option>
        <option value="Card">Card</option>
        {render && <option value="All">All</option>}
      </select>
    </div>
  );
}

export default Genres;
