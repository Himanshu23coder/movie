import "./App.css";
import Navbar from "./Components/Nabar";
import List from "./Components/List";
import Favorite from "./Components/Favorite";
import ListDetails from "./Components/ListDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./Components/Banner";
import ListDetail from "./Components/ListDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/listdetail" exact element={<ListDetail />} />
        <Route path="/" element={[<Banner />, <List />]} />
        <Route path="/favourites" element={<Favorite />} />
      </Routes>
    </Router>
  );
}

export default App;

// 51.26
