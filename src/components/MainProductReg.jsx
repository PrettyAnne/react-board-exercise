import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainProductReg () {
    const navigate = useNavigate();
    
    const now = new Date();
    const [board, setBoard] = useState({
        id: 0,
        name: '',
        tag: '',
        price: 0,
        thumb_url: '',
        url: '',
        reg_id: '정정화',
        reg_date: now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate()
    });

    useEffect(() => {
    }, []);

    const save = () => {
        fetch(`${process.env.REACT_APP_API_URL}/lush/mainProduct`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(board)
        })
	  .then(res => {
		res.json().then(json => {
            alert(json.message);
		});
	  }).catch((err) => {console.log(err)});
    }

    return (
        <>
        <div className="field">
            <label className="label">name</label>
            <div className="control">
                <input className="input" type="text" value={board.name} onChange={(e) => {setBoard({...board, name: e.target.value}); }} />
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
                <input className="input" type="text" value={board.thumb_url} onChange={(e) => {setBoard({...board, thumb_url: e.target.value}); }} />
            </div>
        </div>
        <div className="field">
            <label className="label">URL</label>
            <div className="control">
                <input className="input" type="text" value={board.url} onChange={(e) => {setBoard({...board, url: e.target.value}); }} />
            </div>
        </div>
        <div className="field">
            <label className="label">writer</label>
            <div className="control">{board.reg_id}</div>
        </div>
        <div className="field">
            <label className="label">date</label>
            <div className="control">{board.reg_date}</div>
        </div>
        <div className="control">
            <button className="button is-primary" onClick={save}>저장</button>
            <button className="button is-secondary" onClick={() => {
                navigate('/mainProductList');
            }}>목록</button>
        </div>
        </>
    );
}