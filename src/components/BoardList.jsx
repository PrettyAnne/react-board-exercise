import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoradList() {
	const navigate = useNavigate();
	const [boardList, setBoardList] = useState();

	const [srchSubject, setSrchSubject] = useState("");
	const [srchWriter, setSrchWriter] = useState("");
	const [pageList, setPageList] = useState();
	const [countPerPage, setCountPerPage] = useState(5);
	const [page, setPage] = useState(1);
	
	useEffect(() => {
		getList();
	}, [page]);
	
	const getList = () => {
		fetch(
			`${process.env.REACT_APP_API_URL}/board?page=${page}&countPerPage=${countPerPage}&srchSubject=${srchSubject}&srchWriter=${srchWriter}`
		)
			.then((res) => {
				res.json().then((json) => {
					var _pageList = [];
					for (var i = 1; i <= Math.ceil(json.totalCount / countPerPage); i++) {
						_pageList.push(i);
					}
					setPageList(_pageList);
					setBoardList(json.list);
				});
			})
			.catch((err) => {
				console.log(err);
			});
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

			<nav
				class="pagination is-centered"
				role="navigation"
				aria-label="pagination">
				<a class="pagination-previous" onClick={() => {
					if (page > 1) setPage(page-1);
				}}>Previous</a>
				<a class="pagination-next" onClick={() => {
					// 총 페이지수를 넘어가지 않도록
					if (true) setPage(page + 1);
				}}>Next page</a>
				<ul className="pagination-list">
					{pageList && pageList.map(value => (
					<li>
						<a 
						className={"pagination-link" + (value === page ? " is-current" : "")}
						aria-label={"Goto page " + value}
						onClick={() => {
							setPage(value);
						}}>{value}</a>
					</li>
					))}
				</ul>
			</nav>

			<div className="field is-grouped is-grouped-right">
				<button
					onClick={() => {
						navigate("/board");
					}}
				>
					등록
				</button>
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
					<select
						value={srchWriter}
						onChange={(e) => {
							setSrchWriter(e.target.value);
						}}
					>
						<option value="">select dropdown</option>
						<option value="정정화">정정화</option>
						<option value="진상호">진상호</option>
					</select>
				</p>
				<p className="control">
					<button className="button is-primary" onClick={getList}>
						검색
					</button>
				</p>
			</div>
		</>
	);
}
