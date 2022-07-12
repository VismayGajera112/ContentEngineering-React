import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../../components/LoginForm'
import RegistrationForm from '../../components/RegistrationForm';
import LoginOtp from './LoginOtp';

const Login = () => {

    const [toggle, setToggle] = useState('login')

    return (
        <div>
            {
                toggle === 'login' && (<LoginForm LoginOTP={() => setToggle('loginotp')} Registration={() => setToggle('register')} />)
            }

            {
                toggle === 'loginotp' && (<LoginOtp Login={() => setToggle('login')} />)
            }

            {
                toggle === 'register' && (<RegistrationForm Login={() => setToggle('login')}/>)
            }
        </div>
    )
}

export default Login
