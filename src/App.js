import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./components/index";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import BoardReg from "./components/BoardReg";
import MainBannerList from "./components/MainBannerList";
import MainBannerMod from "./components/MainBannerMod";
import MainBannerReg from "./components/MainBannerReg";

export default function App() {
  return (
    <div className="container">
      <h1>React Board Exercise</h1>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/boardList" element={<BoardList />} />
        <Route path="/mainBannerList" element={<MainBannerList />} />
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/mainMod/:id" element={<MainBannerMod />} />
        <Route path="/mainReg" element={<MainBannerReg />} />
        <Route path="/board" element={<BoardReg />} />
      </Routes>
    </div>
  );
}