import React, { useState } from 'react'
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetch from "../useFetch.js"


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
    const server = 'http://localhost:8080'

    const [register, fetchRegister] = useFetch(`${server}/register`)

 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8080/login', {
                email: email,
                password: password
            });
            history.push("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (     
    <>
    <button onClick={() => fetchRegister()}>Register</button>
    
    {register.isFetching && <p>Baixando info ambientes...</p>}
    {register.didSucceed && (
    register.data.map(registro => (
        <Register {...registro} />
      ))
    )}
        
        
        <section className="section is-centered">
            <div  className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Email or Username</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section></>
    )
}
 
function Register({msg }) {
  return (
    <>
    <h2>msg: {co2}</h2>   
    </>
  )
}

export default Login