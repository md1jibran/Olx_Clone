import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../config";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      history("/");
    }
  }, []);

  const submitHandler = async () => {
    if (!email || !password) {
      // PopUp
      toast.error("Email and Password required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const dxt = {
      email,
      password,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dxt),
    };
    try {
      const fetchResponse = await fetch(`${baseURL}/api/user/login`, settings);
      const data = await fetchResponse.json();
      console.log(data);
      if (!data.email || data.message) {
        toast.error("Invalid Email and Password!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Successfully Logged In!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        history("/");
      }
    } catch (error) {
      toast.error("Error Occured!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-cover">
        <h1 className="login-head">Login</h1>
        <input
          className="login-input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
        />
        <input
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <div className="login-btn" onClick={submitHandler}>
          Login
        </div>
        <div>OR</div>
        <Link className="login-register" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
