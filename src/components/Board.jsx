import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    fetch(`${process.env.REACT_APP_API_URL}/board/${params.boardId}`)
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
    fetch(`${process.env.REACT_APP_API_URL}/board/${params.boardId}`, {
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
    if (window.confirm("Delete?")) {
      fetch(`${process.env.REACT_APP_API_URL}/board/${params.boardId}`, {
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
        <label className="label">content</label>
        <div className="control">
          {board && board.id !== 0 && <CKEditor
            editor={ClassicEditor}
            data={board.content}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setBoard({ ...board, content: data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />}
        </div>
      </div>
      <div className="field">
        <label className="label">content</label>
        <div className="control" dangerouslySetInnerHTML={{__html: board.content}}></div>
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
