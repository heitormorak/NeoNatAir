import './App.css'
import { React } from 'react'

// const server = 'https://backend-api-airpure.vercel.app'
const server = 'http://localhost:8080'
const token = "vfbf3d7gpts6t46r87nyp6"

//fazer login no dispositivo
    async function loginAPI(){

      const body = {
        //senha: teste
        usr: "heitor1", 
        pass: "698dc19d489c4e4db73e28a713eab07b"
      }

      const response = await fetch(`${server}/loginAirPure`,{
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      })

    console.log(response.status, response.statusText)
    console.log(response.headers)
    const responseBody = await response.json()
    console.log("TOKEN resposta:", responseBody.session_token)
}

//obter infos do ambiente
async function infoAmbientes(){

  const body = {
    //senha: teste
    id: "1", 
    sessiontoken: token
  }

  const response = await fetch(`${server}/infoAmbientes`,{
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
})

console.log(response.status, response.statusText)
console.log(response.headers)
const responseBody = await response.json()
console.log(responseBody)
}

//consultar leituras da data x
async function LeiturasDia(){

  const response = await fetch(`${server}/leiturasDia`,{
    method: "GET",
    headers: {
      accept: "application/json"
    },
  })
  
  console.log(response.status, response.statusText)
  console.log(response.headers)
  //const responseBody = await response.json()
  //console.log(responseBody)
}

//consultar última leitura
async function UltimaLeitura(){

  const response = await fetch(`${server}/ultimaLeitura`,{
    method: "GET",
    headers: {
      accept: "application/json"
    },
  })
  
  console.log(response.status, response.statusText)
  console.log(response.headers)
  const responseBody = await response.json()
  console.log(responseBody)
}


function App() {

  return (
   <>
   
    <button onClick={() => loginAPI()}> Teste Login </button>  
    <button onClick={() => infoAmbientes()}>Teste Info Ambiente</button>
    <button onClick={() => LeiturasDia()}>Teste Leituras Dia</button>
    <button onClick={() => UltimaLeitura()}>Teste Ultima Leitura</button>
    
  </>
  )
}

export default App

