import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoradList () {
		const navigate = useNavigate();
    const [boardList, setBoardList] = useState();
    useEffect(() => {
        const _boardList = JSON.parse(window.localStorage.getItem('boardList'));
        setBoardList(_boardList);
    }, []);
		const [srchSubject, setSrchSubject] = useState('');
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
							{boardList && boardList.map(value => (
								<tr key={value.id} style={{ cursor: "pointer"}} onClick={() => { navigate(`/board/${value.id}`); }}>
									<td>{value.no}</td>
									<td>{value.subject}</td>
									<td>{value.writer}</td>
									<td>{value.date}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="field is-grouped is-grouped-right">
						<p className="control">
							<input className="input" type="text" placeholder="Text input" value={srchSubject} onChange={(e) => { setSrchSubject(e.target.value) }} />
						</p>
						<p className="control">
							<button className="button is-primary" onClick={() => {
								let _boardList = JSON.parse(window.localStorage.getItem('boardList'));
								setBoardList(_boardList.filter(value => value.subject.indexOf(srchSubject) > -1));
							}}>검색</button>
						</p>
					</div>
        </>
    );
}