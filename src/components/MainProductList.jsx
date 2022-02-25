import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainProductList() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState();

  const [srchName, setSrchName] = useState("");
  const [srchWriter, setSrchWriter] = useState("");
  const [srchDateFrom, setSrchDateFrom] = useState("");
  const [srchDateTo, setSrchDateTo] = useState("");
  const [pageList, setPageList] = useState();
  const [countPerPage, setCountPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const pagePerBoard = 2;
  const lastPage = useRef();

  useEffect(() => {
    getList();
  }, [page]);

  const getList = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/lush/mainProduct?page=${page}&countPerPage=${countPerPage}&srchName=${srchName}&srchWriter=${srchWriter}&srchDateFrom=${srchDateFrom}&srchDateTo=${srchDateTo}`
    )
      .then((res) => {
        res.json().then((json) => {
            console.log(json);
          lastPage.current = Math.ceil(json.totalCount / countPerPage);
          var _pageList = [];
          for (var i = 1; i <= lastPage.current; i++) {
            _pageList.push(i);
            if (i % pagePerBoard === 0) {
              if (_pageList.includes(page)) {
                break;
              } else {
                _pageList = [];
              }
            }
          }
          setPageList(_pageList);
          setBoardList(json.list);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Initialize all input of date type.
    const calendars = window.bulmaCalendar.attach('[type="date"]', {});

    // Loop on each calendar initialized
    calendars.forEach((calendar) => {
      // Add listener to select event
      calendar.on("select", (date) => {
        var splitDate = date.data.value().split(' - ');
        setSrchDateFrom(splitDate[0]);
        setSrchDateTo(splitDate[1]);
      });
    });
  }, []);

  return (
    <>
    <div className="columns">
        <div className="column is-one-quarter">
        <div className="field">
        <label class="label">등록일</label>
        <p className="control">
          <input type="date" data-is-range={true} data-date-format={"yyyy.MM.dd"} />
        </p>
        </div>
        </div>
        <div className="column">
        <div className="field">
        <label class="label">이름</label>
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="Text input"
            value={srchName}
            onChange={(e) => {
              setSrchName(e.target.value);
            }}
          />
        </p>
        </div>
        </div>
        <div className="column">
        <div className="field">
        <label class="label">작성자</label>
        <p className="control">
            <div className="select is-fullwidth">
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
              </div>
        </p>
        </div>
        </div>
        <div className="column">
        <div className="field">
        <label class="label">&nbsp;</label>
        <p className="control is-pulled-right">
          <button className="button" onClick={getList}>
            검색
          </button>
        </p>
      </div>
      </div>
      </div>

      <div className="field is-grouped is-grouped-right">
        <p className="control">
      <button className="button is-primary"
          onClick={() => {
            navigate("/productReg");
          }}
        >
          등록
        </button>
        </p>
        </div>

      <table className="table is-bordered is-hoverable is-fullwidth" style={{ tableLayout: 'fixed'}}>
          <colgroup>
          <col width="5%" />
          <col width="*" />
          <col width="30%" />
          <col width="15%" />
          <col width="10%" />
          <col width="10%" />
          </colgroup>
        <thead>
          <tr className="is-selected">
            <th>No</th>
            <th>제목</th>
            <th>썸네일 URL</th>
            <th>URL</th>
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
                  navigate(`/productMod/${value.id}`);
                }}
              >
                <td>{value.no}</td>
                <td>{value.name}</td>
                <td style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{value.thumb_url}</td>
                <td>{value.url}</td>
                <td>{value.reg_id}</td>
                <td>{value.reg_date}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <nav
        class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <a
          className="pagination-previous"
          onClick={() => {
            setPage(1);
          }}
        >
          First
        </a>
        <a
          class="pagination-previous"
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          Previous
        </a>
        <a
          class="pagination-next"
          onClick={() => {
            // 총 페이지수를 넘어가지 않도록
            if (page < lastPage.current) setPage(page + 1);
          }}
        >
          Next page
        </a>
        <a
          className="pagination-next"
          onClick={() => {
            setPage(lastPage.current);
          }}
        >
          Last
        </a>
        <ul className="pagination-list">
          {pageList &&
            pageList.map((value) => (
              <li>
                <a
                  className={
                    "pagination-link" + (value === page ? " is-current" : "")
                  }
                  aria-label={"Goto page " + value}
                  onClick={() => {
                    setPage(value);
                  }}
                >
                  {value}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
