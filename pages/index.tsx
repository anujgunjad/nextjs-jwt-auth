import React, { useState } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("You are not logged in");
  async function submitForm() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());

    const token = res.token;

    if (token) {
      const json = jwt.decode(token) as { [key: string]: string };
      console.log(json);
      setMessage(
        `Welcome ${json.username} and you are ${
          json.admin ? "an admin" : "not an admin"
        }`
      );
    } else {
      setMessage("Something is wrong");
    }
  }
  return (
    <div className="auth">
      <h1>Next.JS with JWT Authentication</h1>
      <p>
        ID - admin <br /> PASSWORD - admin
      </p>
      <form className="main">
        <h1>{message}</h1>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="ID"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="button" value="Login" onClick={submitForm} />
      </form>
      <style jsx>{`
        .auth {
          text-align: center;
        }
        .main {
          margin-top: 10vh;
          border: 1px solid black;
        }

        .main input {
          margin: 10px 0px;
          width: 20rem;
          height: 2rem;
        }
      `}</style>
    </div>
  );
}
