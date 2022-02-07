import React, { useState } from "react";
import Card from "./UI/Card";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "" });
  const [nameError, setNameError] = useState({ error: false, message: "" });
  const [emailError, setEmailError] = useState({ error: false, message: "" });
  const [passwordError, setPasswordError] = useState({ error: false, message: "" });


  const handleChange = (evt) => {
    setUserInfo(prevState => {
      return {
        ...prevState,
        [evt.target.name]: evt.target.value
      };
    });
  };

  const handleSubmit = (evt) => {
    setNameError({ error: false, message: "" });
    setEmailError({ error: false, message: "" });
    setPasswordError({ error: false, message: "" });

    evt.preventDefault();
    console.log("submitted");
    if (userInfo.name.trim() === "") setNameError({ error: true, message: "Name cannot be empty" });
    if (userInfo.email.trim() === "") setEmailError({ error: true, message: "Email cannot be empty" });
    if (userInfo.password.trim() === "") setPasswordError({ error: true, message: "Password cannot be empty" });

    if (userInfo.name.trim() !== "" && userInfo.email.trim() !== "" && userInfo.password.trim() !== "") {

      const fetchData = async () => {
        try {
          const response = await axios.post("http://localhost:8000/user/signup", {
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          console.log(response);

          setNameError({ error: false, message: "" });
          setEmailError({ error: false, message: "" });
          setPasswordError({ error: false, message: "" });

          setUserInfo({ name: "", email: "", password: "" });

          alert("Successfully Signed In");
          navigate("/");
        } catch (err) {
          console.log(err.response);
          const { message } = err.response.data;     //err.response.data is the json that we sent from backend
          setEmailError({ error: true, message: message });
        }
      };
      fetchData();
    }
  };

  return (
    <>
      <Card className={"signup-container"}>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>

            <div className={nameError.error ? "input-container invalid" : "input-container"}>
              <label htmlFor={"name"}>Name:</label>
              <input name={"name"} type="text" value={userInfo.name} onChange={handleChange} />
              {nameError.error && <p>{nameError.message}</p>}
            </div>

            <div className={emailError.error ? "input-container invalid" : "input-container"}>
              <label htmlFor={"email"}>Email:</label>
              <input name={"email"} type="text" value={userInfo.email} onChange={handleChange} />
              {emailError.error && <p>{emailError.message}</p>}
            </div>

            <div className={passwordError.error ? "input-container invalid" : "input-container"}>
              <label htmlFor={"password"}>Password:</label>
              <input name={"password"} type="password" value={userInfo.password} onChange={handleChange} />
              {passwordError.error && <p>{passwordError.message}</p>}
            </div>
            <
              div className={"button"}>
              <button type={"submit"}>Sign Up</button>
            </div>

            <div style={{ fontSize: "20px" }}>
              <p>Already a user? {"  "}<Link style={{ textDecoration: "none" }} to={"/"}>Login</Link></p>

            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default Signup;