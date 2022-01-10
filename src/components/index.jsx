import { Link } from "react-router-dom";

function Main () {
    return (
        <>
            <ul>
                <li><Link to="/boardList">board list sample</Link></li>
                <li><Link to="/mainBannerList">main banner list</Link></li>
            </ul>
        </>
    );
}

export default Main;