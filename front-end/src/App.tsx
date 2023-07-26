import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { allGames } from "./store/actions";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Create from "./components/create/Create";
import Update from "./components/update/Update";
import Navbar from "./components/navbar/Navbar";
import { useAppDispatch } from "./hooks/redux.hooks";
import "./App.css";



function App() {
  const location = useLocation();
  const dispatch = useAppDispatch()  

  useEffect(() => { 
    dispatch(allGames());
  }, []);

  return (
    <div>
      {location.pathname !== "/" && <Navbar />}
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
