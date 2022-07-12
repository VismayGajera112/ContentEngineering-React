import React, { useState } from 'react'
import { FaEnvelope, FaKey } from "react-icons/fa";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import image from '../images/customer.svg'
import '../css/style.css'

const LoginForm = (props) => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await axios.post('http://localhost:5000/api/customer/login', user)
        console.log(response)
        if (response.data.status === 200) {
            toast.success("Login successful", { autoClose: 3000 })
            localStorage.setItem('user', response.data.user)
            setUser({ ...user, password: "" })
            setTimeout(() => {
                navigate('/customer/dashboard')
            }, 1500)
        } else if (response.data.status === 301) {
            toast.error('Login failed. Please try again', { autoClose: 5000 })
            setUser({ ...user, password: "" })
        } else if (response.data.status === 404) {
            toast.warning('User not registered. Please register yourself', { autoClose: 3000 })
            setUser({ ...user, password: "" })
        }
    }

    const handleEmailChange = (e) => {
        setUser({ ...user, email: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setUser({ ...user, password: e.target.value })
    }


    return (
        <section className="vh-100" style={{ backgroundColor: "var(--main)" }}>
            <ToastContainer />
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black shadow-lg" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                                        <img src={image} className="img-fluid" alt="Sample" />
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">

                                        <h2 className="text-start text-uppercase text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Customer Login</h2>

                                        <p className="text-center h5 fw-bold mb-3 mx-1 mx-md-4 mt-2">Login into your account</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaEnvelope className='fs-4 me-3 fa-fw' />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" name='email' value={user.email} className="form-control" placeholder='Your Email' onChange={handleEmailChange} />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaKey className='fs-4 me-3 fa-fw' />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" name="password" value={user.password} className="form-control" placeholder='Password' onChange={handlePasswordChange} />
                                                </div>
                                            </div>

                                            <p><a href="#!">Forgot Password?</a></p>
                                            <div className="d-flex justify-content-center mb-lg-4">
                                                <button type="submit" className="w-100 button btn-lg">Login</button>
                                            </div>
                                            <hr class="my-3 hr5"/>
                                            <div className="d-flex justify-content-center mb-3 mb-lg-4">
                                                <button type="button" onClick={props.LoginOTP} className="w-100 button btn-lg">Login with OTP</button>
                                            </div>
                                            <p className="register" onClick={props.Registration}>Not a member?&nbsp;
                                                <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Register Here</span>
                                            </p>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm
