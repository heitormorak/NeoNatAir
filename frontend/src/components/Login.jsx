import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login =() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const server = 'http://localhost:8080'

    
    async function Auth() {
        const body = {
            email: email,
            password: password
        }
        const response = await fetch(`${server}/login`, {
            method: "POST",             
            headers:{
                accept : "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(body)            
        })
        if (response.status >= 200 && response.status <=300){
            const body = await response.json()
            console.log(body)
            localStorage.setItem("token",body.accessToken)
            navigate('/dashboard');       
        } else {
        console.log("ERRO");
        }        
    }
    
 
    return (     
        <section className="section is-centered">
            <div  className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column">
                            <div className="box">
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
                                <div className="field mt-5">
                                    <button onClick={() => Auth()}>Teste</button>
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

export default Login