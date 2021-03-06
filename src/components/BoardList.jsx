import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoradList() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState();

  const [srchSubject, setSrchSubject] = useState("");
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
      `${process.env.REACT_APP_API_URL}/board?page=${page}&countPerPage=${countPerPage}&srchSubject=${srchSubject}&srchWriter=${srchWriter}&srchDateFrom=${srchDateFrom}&srchDateTo=${srchDateTo}`
    )
      .then((res) => {
        res.json().then((json) => {
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
      <table className="table is-bordered is-hoverable is-fullwidth">
        <thead>
          <tr className="is-selected">
            <th>No</th>
            <th>??????</th>
            <th>?????????</th>
            <th>?????????</th>
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
            // ??? ??????????????? ???????????? ?????????
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

      <div className="field is-grouped is-grouped-right">
        <button
          onClick={() => {
            navigate("/board");
          }}
        >
          ??????
        </button>
        <p className="control">
          <input type="date" data-is-range={true} data-date-format={"yyyy.MM.dd"} />
        </p>
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
            <option value="?????????">?????????</option>
            <option value="?????????">?????????</option>
          </select>
        </p>
        <p className="control">
          <button className="button is-primary" onClick={getList}>
            ??????
          </button>
        </p>
      </div>
    </>
  );
}
