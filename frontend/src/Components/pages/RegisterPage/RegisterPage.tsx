import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";
import { NavLink } from "react-router-dom";

function isValidEmail(email: string): boolean {
  // Regex pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function RegisterPage(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const myURL = "http://localhost:3001/api/siteUsers";

  const makeRegister = () => {
    // Perform validation checks
    if (!firstName || !lastName || !userEmail || !userPass) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (userPass.length < 4) {
      setErrorMessage("Password must be at least 4 characters.");
      return;
    }

    if (!isValidEmail(userEmail)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    // Create a data object with the form fields
    const data = {
      user_name: firstName,
      user_lastname: lastName,
      user_email: userEmail,
      password: userPass,
      role: "user",
    };

    // Perform the register API call here
    axios
      .post(myURL, data)
      .then((response) => {
        console.log("User registered successfully!");
        // Optionally, you can redirect the user to a new page after successful registration
      })
      .catch((err) => {
        console.log({ err });
        if (err.response?.status === 409) {
          setErrorMessage("Email already used.");
        } else {
          setErrorMessage("Error registering user.");
        }
      });
  };

  return (
    <div className="registerPage">
      <h2>Register form:</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <input type="text" placeholder="First Name..." value={firstName} onChange={(args) => setFirstName(args.target.value)} required />
      <br />
      <input type="text" placeholder="Last Name..." value={lastName} onChange={(args) => setLastName(args.target.value)} required />
      <br />
      <input type="text" placeholder="Email..." value={userEmail} onChange={(args) => setUserEmail(args.target.value)} required />
      <br />
      <input
        type="password"
        placeholder="Password (at least 4 characters)..."
        value={userPass}
        onChange={(args) => setUserPass(args.target.value)}
        required
      />
      <br />
      <div className="buttton">
        <NavLink to="/vacationPage">
          <input type="button" value="Register" onClick={makeRegister} />
        </NavLink>
      </div>
      <br />
      <h3>already have an account?</h3>
      <NavLink to="/">Login page</NavLink>
    </div>
  );
}

export default RegisterPage;
