import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Alert from "./Alert"
import Loader from "./Loader";

const SignupForm = () => {
    const context = useContext(noteContext)
    const { isAlert, setIsAlert, setAlertMessage, setAlertColor, alertColor, alertMessage, sendOTP, verifyEmail, isOtpSending, setIsOtpSending, emailVerified, setLoading, loading } = context
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState(null)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        OTP: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch('https://backend-pk89.onrender.com/api/auth/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password, })
            })
            const data = await response.json()
            setLoading(false)

            if (response.ok) {
                console.log("Navigating to Home...");
                navigate('/login');
                setIsAlert(true)
                setAlertMessage("Account created successfully")
                setAlertColor("success")
            }else if(data.errors){
                console.log(data.errors)
                setIsAlert(true)
                setAlertMessage(data.errors)
                setAlertColor("danger")
            } else {
                setIsAlert(true)
                setAlertMessage("Something went wrong")
                setAlertColor("danger")
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        let timer;
        if (isOtpSending && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsOtpSending(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer); // Cleanup interval on unmount
    }, [isOtpSending, timeLeft]);


    return (
        <>
            {isAlert && <div className='position-fixed z-3' style={{ width: "100%" }}><Alert color={alertColor} setIsAlert={setIsAlert} alertMessage={alertMessage} /></div>}
            {loading ? <Loader /> : <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
                    <h3 className="text-center mb-3">Sign Up</h3>
                    <form onSubmit={handleSignup}>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <div className="d-flex gap-1">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={emailVerified ? true : false}
                                    required
                                />
                                <input type="button" 
                                onClick={() => {
                                    sendOTP(formData.email)
                                    setIsOtpSending(true)
                                    setTimeLeft(300)
                                }}
                                disabled={isOtpSending}
                                hidden={emailVerified ? true : false} value={"Send OTP"} />
                            </div>
                            {isOtpSending && <div className="text-">OTP is valid till {timeLeft} seconds</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email verification</label>
                            <div className="d-flex gap-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="OTP"
                                    placeholder="Enter OTP"
                                    value={formData.OTP}
                                    onChange={handleChange}
                                    required
                                />
                                <input type="button" onClick={() => { verifyEmail(formData.email, formData.OTP) }} disabled={emailVerified ? true : false} hidden={emailVerified ? true : false} value={"Verify Email"} />
                            </div>
                        </div>

                        {
                            emailVerified && (
                                <div>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Enter your password"
                                            autoComplete="true"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Sign Up
                                    </button>
                                </div>
                            )
                        }
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
            }
        </>
    );
};

export default SignupForm;
