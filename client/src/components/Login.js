import React, { useState } from 'react'
import axios from 'axios';
import './stylesLogin.css';
export default function Login({ setIsLogin }) {
    const [user, setUser] = useState({ email: '', password: '' })
    const [err, setErr] = useState('')
    const [userRegister, setUserRegister] = useState({ email: '', password: '' })
    const [errRegister, setErrRegister] = useState('')
    const [onLogin, setOnLogin] = useState(false)

    const URIbase = `http://app-presupuesto-mern.herokuapp.com`
    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        setErr('')
    }

    const onChangeRegister = e => {
        const { name, value } = e.target;
        setUserRegister({ ...userRegister, [name]: value })
        setErrRegister('')
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post(`${URIbase}/api/auth/register`, {
                email: userRegister.email,
                password: userRegister.password
            })
            setUserRegister({ email: '', password: '' })
            setErrRegister(res.data.message || res.data.msg)
            console.log(errRegister)
        } catch (err) {

            if (
                err.response &&
                err.response.status >= 400 &&
                err.response.status <= 500

            ) {
                setErrRegister(err.response.data.msg)

            }
        }
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post(`${URIbase}/api/auth/login`, {
                email: user.email,
                password: user.password
            })
            setUser({ email: '', password: '' })
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
            setErr(err.response.data.msg)
        } catch (err) {
            if (
                err.response &&
                err.response.status >= 400 &&
                err.response.status <= 500
            ) {
                setErr(err.response.data.error);
            }
        }
    }


    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    }

    return (
        <section>
            <div className='mainBlock'>
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <input className='input' type="email" name="email" id="login-email"
                        placeholder="Email" required value={user.email}
                        onChange={onChangeInput} />

                    <input type="password" name="password" id="login-password"
                        placeholder="Password" required value={user.password}
                        autoComplete="true"
                        onChange={onChangeInput} />

                    <button className='button' type="submit">Login</button>
                    <p>You don't have an account?
                        <span className='underline' onClick={() => setOnLogin(true)}> Register Now</span>
                    </p>
                    <h3>{err}</h3>
                </form>
            </div>
            <div style={style}>

                <form className='mainBlock' onSubmit={registerSubmit}>
                    <h2>Register</h2>
                    <input type="email" name="email" id="register-email"
                        placeholder="Email" required value={userRegister.email}
                        onChange={onChangeRegister} />

                    <input type="password" name="password" id="register-password"
                        placeholder="Password" required value={userRegister.password}
                        autoComplete="true" onChange={onChangeRegister} />

                    <button className='button' type="submit">Register</button>
                    <span onClick={() => setOnLogin(false)}></span>

                    <h3>{errRegister}</h3>
                </form>
            </div>
        </section>
    )
}