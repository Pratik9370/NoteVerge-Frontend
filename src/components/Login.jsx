import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Alert from "./Alert";
import Loader from "./Loader"

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext)
  const { isAlert, setIsAlert, setAlertMessage, setAlertColor, alertColor, alertMessage, setLoading, loading } = context
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response Data:", data);
      setLoading(false)

      if (response.ok) {
        console.log("Navigating to Home...");
        navigate(0); // Redirect after successful login
        setIsAlert(true)
        setAlertMessage("Logged in successful, Welcome")
        setAlertColor("success")
      } else {
        setIsAlert(true)
        setAlertMessage("Login failed")
        setAlertColor("danger")
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (

    <>
      {isAlert && <div className='position-fixed z-3' style={{ width: "100%" }}><Alert color={alertColor} setIsAlert={setIsAlert} alertMessage={alertMessage} /></div>}
      {
        loading ? <Loader /> : <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={handleLogin} id="registrationForm">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                value={credentials.email}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
                autoComplete="true"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                value={credentials.password}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3 mb-0">
            Forgot Password?
            <Link to="/forgotPassword"> Reset Here</Link>
          </p>
          <p className="text-center">
            Not registered?
            <Link to="/register"> Create an account</Link>
          </p>
        </div>
      </div>
      }
    </>
  );
};

export default Login;
