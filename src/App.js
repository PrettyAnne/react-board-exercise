import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Board from "./components/Board";
import BoradList from "./components/BoardList";
import BoardReg from "./components/BoardReg";

export default function App() {
  return (
    <div className="container">
      <h1>React Board Exercise</h1>
      <Routes>
        <Route path="/" element={<BoradList />} />
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/board" element={<BoardReg />} />
      </Routes>
    </div>
  );
}