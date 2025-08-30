import React, { useState, useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from "react-router-dom";
import Alert from './Alert';
import Loader from './Loader';


const ForgotPassword = () => {
    const context = useContext(noteContext)
    const navigate = useNavigate()
    const { isAlert, setIsAlert, setAlertMessage, setAlertColor, alertColor, alertMessage, forgotPasswordOtp, verifyEmail, isOtpSending, setIsOtpSending, emailVerified, loading, setLoading } = context
    const [formData, setFormData] = useState({
        email: "",
        OTP: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetPassword = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch('https://backend-pk89.onrender.com/api/auth/resetPassword', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
                credentials: "include",
            })
            const data = await response.json()
            console.log(response.ok)

            setLoading(false)
            if (response.ok) {
                setIsAlert(true)
                setAlertMessage(data.message)
                setAlertColor("success")
            }
            else {
                setIsAlert(true)
                setAlertMessage(data.message)
                setAlertColor("danger")
            }
            navigate("/login")
        } catch (err) {
            console.error(err)
        }
    }

    const [timeLeft, setTimeLeft] = useState(null)
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
            {loading ? <Loader /> :
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
                        <h3 className="text-center mb-3">Reset Password</h3>

                        <form onSubmit={resetPassword}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <div className="d-flex gap-1">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        value={formData.email}
                                        required
                                    />
                                    <input type="button" onClick={() => {
                                        forgotPasswordOtp(formData.email)
                                        setIsOtpSending(true)
                                        setTimeLeft(300)
                                    }}
                                        disabled={isOtpSending}
                                        hidden={emailVerified ? true : false} value={"Send OTP"} />
                                </div>
                                {isOtpSending && <div className="text-" hidden={emailVerified ? true : false}>OTP is valid till {timeLeft} seconds</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email verification</label>
                                <div className="d-flex gap-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="OTP"
                                        placeholder="Enter OTP"
                                        onChange={handleChange}
                                        value={formData.OTP}
                                        required
                                    />
                                    <input type="button" onClick={() => { verifyEmail(formData.email, formData.OTP) }} hidden={emailVerified ? true : false} disabled={emailVerified ? true : false} value={"Verify Email"} />
                                </div>
                            </div>
                            {emailVerified && <div>
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
                                    Reset Password
                                </button>
                            </div>
                            }
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ForgotPassword
