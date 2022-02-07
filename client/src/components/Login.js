import React, { useState } from "react";
import Card from "./UI/Card";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Backdrop from "./UI/Backdrop";
import Overlay from "./UI/Overlay";

const Login = () => {

  const navigate = useNavigate();

  const [isPopUpShown, setIsPopUpShown] = useState(true);

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
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
    setEmailError({ error: false, message: "" });
    setPasswordError({ error: false, message: "" });

    evt.preventDefault();
    if (userInfo.email.trim() === "") setEmailError({ error: true, message: "Email cannot be empty" });
    if (userInfo.password.trim() === "") setPasswordError({ error: true, message: "Password cannot be empty" });

    if (userInfo.email.trim() !== "" && userInfo.password.trim() !== "") {

      const fetchData = async () => {
        try {
          const response = await axios.post("http://localhost:8000/user/login", {
            email: userInfo.email,
            password: userInfo.password
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });

          const { token } = response.data;
          //store token in local storage
          localStorage.setItem("token", token);

          setUserInfo({ email: "", password: "" });

          navigate("/application");
        } catch (err) {
          console.log(err.response);
          const { type, message } = err.response.data;     //err.response.data is the json that we sent from backend
          type === "EMAIL" ? setEmailError({ error: true, message: message }) : setPasswordError({
            error: true,
            message: message
          });
        }
      };
      fetchData();
    }
  };

  return (
    <>
      {isPopUpShown && <Backdrop onClose={() => setIsPopUpShown(false)} />}
      <Overlay show={isPopUpShown} onClose={() => setIsPopUpShown(false)}>
        <p>To view the working of this application with sample data, login with the credentials given below</p>
        <p><strong>Email: </strong>user@example.com</p>
        <p><strong>Password: </strong>123456</p>
        <p>If you are interested create your own account and add your own data</p>
        <div className={"btn-container"}>
          <button onClick={() => setIsPopUpShown(false)}>Close</button>
        </div>
      </Overlay>

      <Card className={"login-container"}>
        <div className="login-form">
          <form onSubmit={handleSubmit}>

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

            <div className={"button-container"}>
              <button type={"submit"}>Login</button>
            </div>

            <div style={{ fontSize: "20px" }}>
              <p>Don't have an Account{"  "}<Link style={{ textDecoration: "none" }} to={"/signup"}>Sign Up</Link></p>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default Login;