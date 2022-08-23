/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";
import { Grid } from '@mui/material';
//import { AppWidgetSummary } from '../components/dashboard/AppWidgetSummary'

const Dashboard = () => {

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

    
    
   
    return (
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
            <button onClick={() => setSeries(([{name: "heitor", data:[50,40]}]))}></button>
            <Grid item xs={12} sm={6} md={3}>
            {/* <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} /> */}
            </Grid>
        </div>
        </div>
    );
    



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