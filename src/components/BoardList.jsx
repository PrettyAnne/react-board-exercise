import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoradList() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState();
  useEffect(() => {
    getList();
  }, []);

  const [srchSubject, setSrchSubject] = useState("");
  const [pageList, setPageList] = useState();
  const [countPerPage, setCountPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const getList = () => {
	  fetch(`http://192.168.1.12:3001/api/board?page=${page}&countPerPage=${countPerPage}&srchSubject=${srchSubject}`)
	  .then(res => {
		res.json().then(json => {
			var _pageList = [];
			for (var i = 1; i <= Math.ceil(json.totalCount / countPerPage); i++) {
				_pageList.push(i);
			}
			setPageList(_pageList);
			setBoardList(json.list);
		});
	  }).catch((err) => {console.log(err)});
  };


  return (
    <>
      <table className="table is-bordered is-hoverable is-fullwidth">
        <thead>
          <tr className="is-selected">
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boardList &&
            boardList.map((value) => (
              <tr
                key={value.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/board/${value.id}`);
                }}
              >
                <td>{value.no}</td>
                <td>{value.subject}</td>
                <td>{value.writer}</td>
                <td>{value.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="field is-grouped is-grouped-right">
		<button onClick={() => { navigate('/board'); }}>등록</button>
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={srchSubject}
            onChange={(e) => {
              setSrchSubject(e.target.value);
            }}
          />
        </p>
        <p className="control">
          <button
            className="button is-primary"
            onClick={getList}
          >
            검색
          </button>
        </p>
      </div>
    </>
  );
}
