import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function MainReviewMod() {
  const navigate = useNavigate();
  const params = useParams();

  const [board, setBoard] = useState({
    id: 0,
    tag: "",
    price: 0,
    subject: "",
    content: "",
    writer: "",
    date: ""
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/lush/mainProduct/${params.id}`)
      .then((res) => {
        res.json().then((json) => {
          setBoard({...json, mod_id: 'jjh'});
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const save = () => {
    fetch(`${process.env.REACT_APP_API_URL}/lush/mainProduct/${params.id}`, {
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
      fetch(`${process.env.REACT_APP_API_URL}/lush/mainProduct/${params.id}`, {
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
        <label className="label">name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.name}
            onChange={(e) => {
              setBoard({ ...board, name: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">tag</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.tag}
            onChange={(e) => {
              setBoard({ ...board, tag: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">price</label>
        <div className="control">
          <input
            className="input"
            type="number"
            value={board.price}
            onChange={(e) => {
              setBoard({ ...board, price: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">thumb URL</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.thumb_url}
            onChange={(e) => {
              setBoard({ ...board, thumb_url: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">url</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={board.url}
            onChange={(e) => {
                setBoard({ ...board, url: e.target.value });
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
            value={board.reg_id}
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
            value={board.reg_date}
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
            navigate("/mainProductList");
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
