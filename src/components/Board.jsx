import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Board() {
  const navigate = useNavigate();
  const params = useParams();

  const [board, setBoard] = useState({
    id: 0,
    subject: "",
    content: "",
    writer: "",
    date: "",
  });

  useEffect(() => {
    fetch(`http://192.168.1.12:3001/api/board/${params.boardId}`)
      .then((res) => {
        res.json().then((json) => {
          setBoard(json);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const save = () => {
    fetch(`http://192.168.1.12:3001/api/board/${params.boardId}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(board),
    })
      .then((res) => {
        res.json().then((json) => {
          alert(json.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const del = () => {
    if (window.confirm('Delete?')) {
      fetch(`http://192.168.1.12:3001/api/board/${params.boardId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(board),
      })
        .then((res) => {
          res.json().then((json) => {
            alert(json.message);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="field">
        <label className="label">id</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.id}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">subject</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.subject}
            onChange={(e) => {
              setBoard({ ...board, subject: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">writer</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.writer}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">date</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.date}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="control">
        <button className="button is-primary" onClick={save}>
          저장
        </button>
        <button
          className="button is-secondary"
          onClick={() => {
            navigate("/");
          }}
        >
          목록
        </button>
      </div>
      <div className="control">
        <button className="button is-primary" onClick={del}>
          삭제
        </button>
      </div>
    </>
  );
}
