import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./components/index";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import BoardReg from "./components/BoardReg";
import MainBannerList from "./components/MainBannerList";
import MainBannerMod from "./components/MainBannerMod";
import MainBannerReg from "./components/MainBannerReg";
import MainProductList from "./components/MainProductList";
import MainProductMod from "./components/MainProductMod";
import MainProductReg from "./components/MainProductReg";
import MainReviewList from "./components/MainReviewList";
import MainReviewMod from "./components/MainReviewMod";
import MainReviewReg from "./components/MainReviewReg";
import Login from "./components/Login";

export default function App() {
const [user, setUser] = useState({
  username: '',
  token: ''
});

  return (
    <div className="container">
      <h1 className="title"><Link to="/">React Board Exercise</Link></h1>
      {user.username}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/boardList" element={<BoardList />} />
        <Route path="/mainBannerList" element={<MainBannerList userToken={user.token} />} />
        <Route path="/mainProductList" element={<MainProductList />} />
        <Route path="/mainReviewList" element={<MainReviewList />} />
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/mainMod/:id" element={<MainBannerMod />} />
        <Route path="/mainReg" element={<MainBannerReg />} />
        <Route path="/reviewMod/:id" element={<MainReviewMod />} />
        <Route path="/productMod/:id" element={<MainProductMod />} />
        <Route path="/productReg" element={<MainProductReg />} />
        <Route path="/reviewReg" element={<MainReviewReg />} />
        <Route path="/board" element={<BoardReg />} />
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
      </Routes>
    </div>
  );
}