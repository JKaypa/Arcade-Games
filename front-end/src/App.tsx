import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Create from "./components/create/Create";
import Update from "./components/update/Update";
import Navbar from "./components/navbar/Navbar";
import "./App.css";


function App() {
  const location = useLocation();
 
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
