import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import StepForm from './StepForm';

const LoginOtp = (props) => {

    const Login = props.Login

    const [form, setForm] = useState({
        phone: '',
        hash: '',
        otp: '',
    })

    const [step, setStep] = useState(1)

    const handleChange = (input) => (e) => {
        setForm({ ...form, [input]: e.target.value })
    }

    const hashHandleChange = (hash) => {
        setForm({ ...form, hash: hash })
    }

    const nextStep = () => {
        setStep(prevStep => prevStep + 1)
    }

    // const prevStep = () => {
    //     setStep(prevStep => prevStep - 1)
    // }

    const { phone, hash, otp } = form
    const value = { phone, hash, otp }


    switch (step) {
        case 1:
            return <StepForm step={step} nextStep={nextStep} handleChange={handleChange} value={value} hashHandleChange={hashHandleChange} Login={Login} />
        
        case 2:
            return <StepForm step={step} nextStep={nextStep} handleChange={handleChange} value={value} hashHandleChange={hashHandleChange} Login={Login}/>
        default:
            return null;
    }

}

export default LoginOtp
