import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import image from '../../images/customer.svg'

const StepForm = (props) => {

    const { step, handleChange, value, hashHandleChange, Login } = props

    const navigate = useNavigate()

    const Continue = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/api/customer/sendcode', {
            phone: value.phone
        })
            .then((response) => {
                toast.success("OTP Sent!", { autoClose: 3000 })
                console.log(response.data)
                const hash = response.data.hash
                hashHandleChange(hash)
            })
            .catch(err => console.log(err))

        props.nextStep()
    }

    const ConfirmOTP = (e) => {
        e.preventDefault()

        axios.defaults.withCredentials = true
        axios.post('http://localhost:5000/api/customer/verifycode', {
            phone: value.phone,
            hash: value.hash,
            otp: value.otp
        })
            .then(response => {
                console.log(response.data)
                setTimeout(() => {
                    navigate('/customer/dashboard')
                }, 1500)
            })
            .catch(err => console.log(err))
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

                                        <form className={step === 1 ? "mx-1 mx-md-4" : "d-none"} onSubmit={Continue} >
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="tel" className="form-control" placeholder='Enter Number' value={value.phone} onChange={handleChange('phone')} />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mb-3 mb-lg-4">
                                                <button type="submit" className="w-100 button btn-lg">Send Code</button>
                                            </div>
                                            <div className="d-flex justify-content-center mb-3 mb-lg-4">
                                                <button type='button' onClick={Login} className="w-100 button btn-lg">Login with E-mail</button>
                                            </div>
                                        </form>

                                        <form className={step === 2 ? "mx-1 mx-md-4" : "d-none"} onSubmit={ConfirmOTP} >
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" className="form-control" placeholder='Enter Code' value={value.otp} onChange={handleChange('otp')} />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mb-3 mb-lg-4">
                                                <button type='submit' className="w-100 button btn-lg">Login</button>
                                            </div>
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

export default StepForm
