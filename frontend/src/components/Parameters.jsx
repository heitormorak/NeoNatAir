/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Chart from "react-apexcharts";
import { Grid, Container, Typography ,Button } from '@mui/material';
import AppWidgetSummary from './dashboard/app/AppWidgetSummary';
import useFetch from '../useFetch';
import Alert from 'react-popup-alert';
import 'react-popup-alert/dist/index.css'

const server = 'http://localhost:8080'

const Parameters = () => {
    // const [limitCO2,setLimitCO2] = useState(null);
    // const [limitRuido,setLimitRuido] = useState(null);
    // const [limitLuminosidade,setLimitLuminosidade] = useState(null);
    // const [limitTemperatura,setLimitTemperatura] = useState(null);
    // const [limitCOVT,setLimitCOVT] = useState(null);
    // const [limitUmidade,setLimitUmidade] = useState(null);
    const [parameters, setParameters] = useState({})

    useEffect(()=>{
        async function fetchParameters(){
            const response = await fetch(`${server}/parameter`, 
            {
                method: "GET",
                headers: {            
                    accept: "application/json",
                    "content-type": "application/json"            
                }
            })
            const body = await response.json()
            console.log(body)
        }
        fetchParameters()

    })

    return(
        <div style={{width:'100vw',height:"100vh" }}> 
        <Alert
            header={'ATENÇÃO'}
            // btnText={'X'}
            text={alert.text}
            type={alert.type}
            show={alert.show}
            // onClosePress={onCloseAlert}
            pressCloseOnOutsideClick={true}
            showBorderBottom={true}
            alertStyles={{}}
            headerStyles={{marginBotton: '50px', color:'red'}}
            textStyles={{marginTop: '60px', fontSize: 30, fontWeight:"bold" }}
            buttonStyles={{visibility:'hidden'}}
        />
        {/* <button onClick={() => fetchLogin()}> Teste Login </button>       
        <button onClick={() => fetchInfoAmbientes()}>Teste Info Ambiente</button>   */}
        
        <Grid container>

            <Grid   classname="side-bar" 
                xs={1}
                style={{    textAlign:"center",
                            padding:'10px',
                            background:"rgb(208, 242, 255)",
                            height:"100vh",
                        }}  
                >
                <Grid   container
                        direction="column"
                        justifyContent="space-between"
                        style={{height:"100%"}} >
                    <Grid  style={{ background:''}}>
                        <Button style={{ width:'100%',marginBottom:'5px'}} href='/dashboard'>
                            <p style={{color:'black', fontWeight:'bold', fontSize: '15px'}}>Home</p>       
                        </Button >
                        <Button style={{ width:'100%',marginBottom:'5px'}} href='/dashboard'>
                            <p style={{ color:'black', fontWeight:'bold', fontSize: '15px'}}>Reports</p>       
                        </Button >
                        <Button style={{ width:'100%',marginBottom:'5px'}} href='/parameters'>
                            <p style={{color:'black', fontWeight:'bold', fontSize: '15px'}}>Parameters</p>       
                        </Button >
                    </Grid>
                    <Grid  style={{ justifyContent:"flex-end"}}>
                        <Button style={{ width:'100%',marginBottom:'5px'}} onClick={()=> Logout()}>
                            <p style={{color:'black', fontWeight:'bold'}}>Logout</p>       
                        </Button >
                    </Grid>
            </Grid>

            </Grid>                
            
            <Grid   classname="main-dashboad" 
                    style={{  textAlign:"center",height:"100vh", padding:'50px'}} 
                    xs={11}>

            
                
                </Grid>
            </Grid>
        
    </div>
);
    
}

export default Parameters