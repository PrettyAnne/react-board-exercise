import { useState } from "react";

export default function Login(props) {
  const [obj, setObj] = useState({
    userId: "",
    password: "",
  });

  const login = () => {
    console.log(obj);
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        res.json().then((json) => {
          props.setUser(json);
          alert('로그인 성공!');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="field">
        <label className="label">id</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={obj.userId}
            onChange={(e) => {
              setObj({ ...obj, userId: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            value={obj.password}
            onChange={(e) => {
                setObj({ ...obj, password: e.target.value});
            }}
          />
        </div>
      </div>
      <div className="control">
        <button className="button is-primary" onClick={login}>
          로그인
        </button>
      </div>
    </div>
  );
}
