/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";
import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from './dashboard/app/AppWidgetSummary';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';
import useFetch from '../useFetch';

const server = 'http://localhost:8080'


const Dashboard = () => {
    const [ultimaLeitura,setUltimaLeitura] = useState(null);
    const [temperaturas, setTemperaturas] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchTemperatura(){
        const response = await fetch(`${server}/chart`, {
            method: "GET",
                headers: {            
                    accept: "application/json",
                    "content-type": "application/json"            
                }
        })
        
        const res = await response.json()
        const temp= res.map(data =>{
            return data.temperatura 
        })
        console.log(temp)
        setTemperaturas([{
            name: "Temperatura",
            data : temp
        }])
    } 
    fetchTemperatura();
    setInterval(()=>{
        fetchTemperatura();
    },30000)
    
    },[])
    
    useEffect(()=>{
        
        if(localStorage.getItem("token") === null) {
            navigate("/")
        }           
        
        fetchUltimasLeituras()
        
        setInterval(()=>{
            fetchUltimasLeituras()
        },20000)
    
    },[])

    const idAmbiente = "1"

   
    
    async function fetchUltimasLeituras(){
        try
        {
            const response = await fetch(`${server}/ultimaLeitura`, {
                method: "GET",
                headers: {            
                    accept: "application/json",
                    "content-type": "application/json"            
                }
            })
            if (response.status >= 300 && response.status <=600){                
                setUltimaLeitura(null)
            }

            const [body] = await response.json();
            
            console.log(body)
            setUltimaLeitura(body)




        }
        catch(e)
        {
            console.log(e)
            setUltimaLeitura(null)
        }

    }

    const loginBody = JSON.stringify({
        //senha: teste
        usr: "heitor1", 
        pass: "698dc19d489c4e4db73e28a713eab07b"
    
        //senha: 12345678
        //usr: "inf",
        //pass: "25d55ad283aa400af464c76d713c07ad"
    })
    const [login, fetchLogin] = useFetch(`${server}/loginAirPure`, {
        method : "POST",
        body : loginBody
    })


    const[options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
 
    })
    const[temperatura, setTemperatura] = useState([{        
        name: "Temperatura",
        data: [100,40,45,50,49]        
    }])  


   
    
    return (
    <div  >  
        {/* <button onClick={() => fetchLogin()}> Teste Login </button>       
        <button onClick={() => fetchInfoAmbientes()}>Teste Info Ambiente</button>   */}
        <div  className="app" >
            <div className="row">        


                <Grid  container spacing={{ xs: 12, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} sm={4} md={4} >
                        <AppWidgetSummary title="CO2" total={ultimaLeitura === null? "..." : ultimaLeitura.co2} theme="temp_1" icon={'ant-design:windows-filled'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Ruído Sonoro" total={ultimaLeitura === null? "..." : ultimaLeitura.db} theme="temp_1" icon={'ant-design:windows-filled'} />
                    </Grid>                    
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Luminosidade" total={ultimaLeitura === null? "..." : ultimaLeitura.lux} theme="temp_1" icon={'ant-design:windows-filled'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Temperatura" total={ultimaLeitura === null? "..." : ultimaLeitura.temperatura} theme="temp_1" icon={'ant-design:windows-filled'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Compostos Orgânicos Voláteis Totais" total={ultimaLeitura === null? "..." : ultimaLeitura.tvoc} theme="temp_1" icon={'ant-design:windows-filled'} />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <AppWidgetSummary title="Umidade" total={ultimaLeitura === null? "..." : ultimaLeitura.umidade} theme="temp_1" icon={'ant-design:windows-filled'} />
                    </Grid>
                </Grid>

                <div className="is-centered">
                    <Chart
                        options={options}
                        series={temperaturas}
                        type="line"
                        width="500"
                    />
                </div>
            <button onClick={() => setTemperatura(([{name: "heitor", data:[50,40]}]))}>Atualizar</button>

            </div>
        </div>
    </div>);
    
}


// const Dashboard = () => {
//     const [name, setName] = useState('');
//     const [token, setToken] = useState('');
//     const [expire, setExpire] = useState('');
//     const [users, setUsers] = useState([]);
//     const history = useNavigate();
 
//     useEffect(() => {
//         refreshToken();
//         getUsers();
//     }, []);
 
//     const refreshToken = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/token');
//             setToken(response.data.accessToken);
//             const decoded = jwt_decode(response.data.accessToken);
//             setName(decoded.name);
//             setExpire(decoded.exp);
//         } catch (error) {
//             if (error.response) {
//                 history.push("/");
//             }
//         }
//     }
 
//     const axiosJWT = axios.create();
 
//     axiosJWT.interceptors.request.use(async (config) => {
//         const currentDate = new Date();
//         if (expire * 1000 < currentDate.getTime()) {
//             const response = await axios.get('http://localhost:8080/token');
//             config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//             setToken(response.data.accessToken);
//             const decoded = jwt_decode(response.data.accessToken);
//             setName(decoded.name);
//             setExpire(decoded.exp);
//         }
//         return config;
//     }, (error) => {
//         return Promise.reject(error);
//     });
 
//     const getUsers = async () => {
//         const response = await axiosJWT.get('http://localhost:8080/users', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         setUsers(response.data);
//     }
 
//     return (
//         <div className="container mt-5">
//             <h1>Welcome Back: {name}</h1>
//             <table className="table is-striped is-fullwidth">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={user.id}>
//                             <td>{index + 1}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                         </tr>
//                     ))}
 
//                 </tbody>
//             </table>
//         </div>
//     )
// }
 
export default Dashboard