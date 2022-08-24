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
    const navigate = useNavigate();
    
    useEffect(()=>{
        
        if(localStorage.getItem("token") === null) 
            navigate("/")
        
        setInterval(()=>{
            fetchUltimasLeituras()
        },10000)
    
    },[])

    const idAmbiente = "1"

    // const [infoAmbientes, fetchInfoAmbientes] = useFetch(`${server}/infoAmbientes/${encodeURIComponent(idAmbiente)}`)
    // const [ultimaLeitura, fetchUltimasLeituras] = useFetch(`${server}/ultimaLeitura/${encodeURIComponent(idAmbiente)}`)

    const [ultimaLeitura,setUltimaLeitura] = useState(null);
    
    async function fetchUltimasLeituras(){
        const response = await fetch(`${server}/ultimaLeitura`, {
            method: "GET",
            headers: {            
                accept: "application/json",
                "content-type": "application/json"            
            }
        })
        const body = await response.json();
        console.log(body)
        setUltimaLeitura(body)

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
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    })
    const[series, setSeries] = useState([{        
        name: "series-1",
        data: [100,40,45,50,49,60,70,91]        
    }])  


   
    
    return (<>  

        <button onClick={() => fetchLogin()}> Teste Login </button>       
        
        <button onClick={() => fetchInfoAmbientes()}>Teste Info Ambiente</button>
        
        
       
       
       
 



        <div className="app">
        <div className="row">
            <div className="mixed-chart">
            <Chart
                options={options}
                series={series}
                type="bar"
                width="500"
            />
            </div>
            <button onClick={() => setSeries(([{name: "heitor", data:[50,40]}]))}>Atualizar</button>


            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <AppWidgetSummary title="CO2" total={ultimaLeitura === null? "..." : ultimaLeitura[0].co2} theme="temp_3" icon={'ant-design:windows-filled'} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <AppWidgetSummary title="Lux" total={ultimaLeitura === null? "..." : ultimaLeitura[0].lux} theme="temp_3" icon={'ant-design:windows-filled'} />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <AppWidgetSummary title="Db" total={ultimaLeitura === null? "..." : ultimaLeitura[0].db} theme="temp_3" icon={'ant-design:windows-filled'} />
                </Grid>
            </Grid>


        </div>
        </div>
    </>);
    
}

function InfoAmbiente({ id, sala, predio, local, dimensao, capmaxima, id_parametros }) {
  return (
    <>
    <h2>Sala: {sala}</h2>
    <h3>Prédio: {predio}</h3>
    <h3>Local: {local}</h3>
    </>
  )
}



function UltimaLeitura({ co2, lux, db, eco2, tvoc, temperatura, umidade, datamedicao, sala }) {
  return (
    <>
    <h2>co2: {co2}</h2>
    <h3>lux: {lux}</h3>
    <h3>db: {db}</h3>
    <h3>eco2: {eco2}</h3>
    <h3>tvoc: {tvoc}</h3>
    <h3>temperatura: {temperatura}</h3>
    <h3>umidade: {umidade}</h3>
    <h3>datamedicao: {datamedicao}</h3>
    <h3>sala: {sala}</h3>
    </>
  )
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