import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Board () {
    const navigate = useNavigate();
    const params = useParams();

    const [board, setBoard] = useState({
        id: 0,
        subject: '',
        content: '',
        writer: '',
        date: ''
    });

    useEffect(() => {
        const _boardList = JSON.parse(window.localStorage.getItem('boardList'));
        setBoard(_boardList.find(value => value.id === Number(params.boardId)));
    }, []);

    return (
        <>
        <div className="field">
            <label className="label">id</label>
            <div className="control">
                <input className="input" type="text" value={board.id} onChange={() => { }} />
            </div>
        </div>
        <div className="field">
            <label className="label">subject</label>
            <div className="control">
                <input className="input" type="text" value={board.subject} onChange={(e) => {setBoard({...board, subject: e.target.value}); }} />
            </div>
        </div>
        <div className="field">
            <label className="label">writer</label>
            <div className="control">
                <input className="input" type="text" value={board.writer} onChange={() => { }} />
            </div>
        </div>
        <div className="field">
            <label className="label">date</label>
            <div className="control">
                <input className="input" type="text" value={board.date} onChange={() => { }} />
            </div>
        </div>
        <div className="control">
            <button className="button is-primary" onClick={() => {
                let _boardList = JSON.parse(window.localStorage.getItem('boardList'));
                window.localStorage.setItem('boardList', JSON.stringify(_boardList.map(value => {
                    if(value.id === board.id) {
                        value.subject = board.subject;
                        value.content = board.content;
                    }
                    return value;
                })));
            }}>저장</button>
            <button className="button is-secondary" onClick={() => {
                navigate('/');
            }}>목록</button>
        </div>
        </>
    );
}