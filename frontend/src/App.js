import "./App.css";
import { Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Application from "./pages/Application";
import MainLayout from "./Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<SignIn/>}/>
        <Route exact path="/application" element={<Application/>}/>
        <Route path="*" element={<MainLayout/>}/>
      </Routes>
    </div>
  );
}

export default App;
