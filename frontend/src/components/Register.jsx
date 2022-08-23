import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch.js"

 
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
    const server = 'http://localhost:8080'


    const [register, fetchRegister] = useFetch(`${server}/register`, {method: 'POST'})

    
    const Register1 = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            history.push("/");
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
        <Register33 {...registro} />
      ))
    )}
        


        <section className="section is-centered">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <form onSubmit={Register1} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section></>
    )
}

function Register33({msg }) {
    return (
      <>
      <h2>msg: {co2}</h2>   
      </>
    )
  }


 
export default Register