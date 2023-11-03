import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../config";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();

  const history = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      history("/");
    }
  }, []);

  const postDetails = (pics) => {
    if (pics === undefined) {
      // PopUp
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "jf9gdinj");
      data.append("cloud_name", "ddqnomvbu");
      fetch("https://api.cloudinary.com/v1_1/ddqnomvbu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("fxxl");
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("PopUp assign");
      return;
    }
  };
  const submitHandler = async () => {
    if (!name || !password || !confirmpassword) {
      // PopUp
      toast.error("Name | Password | ConfirmPassword Required!", {
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
    if (password !== confirmpassword) {
      // PopUp
      toast.error("Password and confirmPassowrd Should be equal!", {
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
    const dxt = {
      name,
      email,
      password,
      pic,
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
      const fetchResponse = await fetch(`${baseURL}/api/user/`, settings);
      console.log("Two");
      const data = await fetchResponse.json();
      // PopUp
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
      // PopUp
      toast.error("Failed to Register the User!", {
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
    <div className="page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="cover">
        <h1>Register</h1>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="confirm password"
          onChange={(e) => setConfirmpassword(e.target.value)}
          placeholder="Confirm password"
        />
        <div className="label">Upload your Picture</div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        <div className="register-btn" onClick={submitHandler}>
          Register
        </div>
        <div>OR</div>
        <Link className="login-register" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
