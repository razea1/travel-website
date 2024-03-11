import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Link, NavLink, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainRoute from "./Components/Routing/mainRoute/mainRoute";

function isValidEmail(email: string): boolean {
  // Regex pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function App() {
  const [userName, setName] = useState("");
  const [userPass, setPass] = useState("");
  const [userId, setUserId] = useState(0);

  const navigate = useNavigate();
  const myURL = "http://localhost:3001/api/checkLogin";

  const makeLogin = () => {
    // Check if the email is valid before making the login request
    if (!isValidEmail(userName)) {
      alert("Invalid email address");
      return;
    }

    const data = {
      user_email: userName,
      password: userPass,
    };

    axios
      .post(myURL, data)
      .then((response) => {
        localStorage.setItem("userId", response.data.userId[0].id);
        console.log({ response: response.data.userId[0].id });
        if (userName === "admin@gmail.com") {
          console.log("inject login.....");
          // Use NavLink to navigate to the admin page
          // Specify the path in the "to" prop
          return navigate("/AdminVacationPage");
        } else {
          // Use NavLink to navigate to the user page
          // Specify the path in the "to" prop
          return navigate("/VacationPage");
        }
      })
      .catch((err) => {
        console.log({ err });
        console.log("oh no .....");
        // window.location.href = "https://www.pinterest.com/pin/56224695327525576/";
      });
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>login form:</h2>
        <input type="text" placeholder="enter user email" onChange={(args) => setName(args.target.value)} required />
        <br />
        <input type="password" placeholder="enter password" onChange={(args) => setPass(args.target.value)} required />
        <br />
        <input type="button" value="login" onClick={makeLogin} />
        <br />
        <h4>dont have an account?</h4>
        <NavLink to="/RegisterPage">Register now</NavLink>
      </div>
    </div>
  );
}

export default App;
