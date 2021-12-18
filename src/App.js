import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Board from "./components/Board";
import BoradList from "./components/BoardList";

export default function App() {
  const defaultData = [
    {id: 1, no: 1, writer: '정화', date: '2021.12.10', subject: '안녕', content: ''},
    {id: 2, no: 2, writer: '정화', data: '2021.12.10', subject: '안녕', content: ''},
    {id: 3, no: 3, writer: '정화', data: '2021.12.10', subject: '안녕', content: ''},
  ]

  useEffect(() => {
    const _boardList = window.localStorage.getItem('boardList');
    if (_boardList === null) {
      window.localStorage.setItem('boardList', JSON.stringify(defaultData));
    }
  }, []);

  return (
    <div className="container">
      <h1>React Board Exercise</h1>
      <Routes>
        <Route path="/" element={<BoradList />} />
        <Route path="/board/:boardId" element={<Board />} />
      </Routes>
    </div>
  );
}