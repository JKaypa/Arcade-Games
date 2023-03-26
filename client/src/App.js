import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { allGames } from "./Redux/Actions";
import Landing from "./Components/Landing/landing";
import Home from "./Components/Home/home";
import Detail from "./Components/Detail/detail";
import Create from "./Components/Create/create";
import Update from "./Components/Update/update";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";

function App() {
  const location = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allGames());
  }, []);

  return (
    <div>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="create" element={<Create />} />
        <Route path="update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
