import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardReg () {
    const navigate = useNavigate();
    
    const now = new Date();
    const [board, setBoard] = useState({
        id: 0,
        subject: '',
        content: '',
        writer: '정정화',
        date: now.getFullYear() + '.' + (now.getMonth() + 1) + '.' + now.getDate()
    });

    useEffect(() => {
    }, []);

    const save = () => {
        fetch(`${process.env.REACT_APP_API_URL}/board`, {
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
            <label className="label">subject</label>
            <div className="control">
                <input className="input" type="text" value={board.subject} onChange={(e) => {setBoard({...board, subject: e.target.value}); }} />
            </div>
        </div>
        <div className="field">
            <label className="label">writer</label>
            <div className="control">{board.writer}</div>
        </div>
        <div className="field">
            <label className="label">date</label>
            <div className="control">{board.date}</div>
        </div>
        <div className="control">
            <button className="button is-primary" onClick={save}>저장</button>
            <button className="button is-secondary" onClick={() => {
                navigate('/');
            }}>목록</button>
        </div>
        </>
    );
}