import "./App.css";
import { Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Application from "./pages/Application";
import MainLayout from "./Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/application" element={<Application />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </div>
  );
}

export default App;
