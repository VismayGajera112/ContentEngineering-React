import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaKey, FaPhoneAlt } from "react-icons/fa";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const RegistrationForm = (props) => {

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
    })

    const handleChange = (e) => {
        e.preventDefault()
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await axios.post('http://localhost:5000/api/customer/register', newUser)
        console.log(response)
        if (response.data.status === 200) {
            toast.success("Registration successful", { autoClose: 3000 })
            setTimeout(() =>{
                props.toggle()
            }, 3000)
            setNewUser({ ...newUser, password: "", name: "", contact: "", email: "" })
        } else {
            toast.error('Registration failed. Please try again', { autoClose: 3000 })
            setNewUser({ ...newUser, password: "", name: "", contact: "", email: "" })
        }
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
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">Customer Registration</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaUser className='fa-lg me-3 fa-fw' />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" name='name' value={newUser.name} className="form-control" placeholder='Your Name' onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaEnvelope className='fa-lg me-3 fa-fw' />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" name='email' value={newUser.email} className="form-control" placeholder='Your Email' onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaPhoneAlt className='fa-lg me-3 fa-fw' />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" name='contact' value={newUser.contact} className="form-control" placeholder='Contact Number' onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <FaKey className='fa-lg me-3 fa-fw' />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" name="password" value={newUser.password} className="form-control" placeholder='Password' onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mb-3 mb-lg-4">
                                                <button type="submit" className="button btn-lg w-100">Register</button>
                                            </div>

                                            <p className="register" onClick={props.Login}>Already a member?&nbsp;
                                                <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Login Here</span>
                                            </p>
                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample" />
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

export default RegistrationForm
