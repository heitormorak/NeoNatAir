import './App.css'
import { React } from 'react'
import useFetch from "./useFetch.js"

// const server = 'https://backend-api-airpure.vercel.app'
const server = 'http://localhost:8080'
//const token = "vfbf3d7gpts6t46r87nyp6"

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
}

//obter infos do ambiente
async function infoAmbientes(){

  //id do usuario airpure, que é retornado no login
  let id = "1"

  const response = await fetch(`${server}/infoAmbientes/${encodeURIComponent(id)}`,{
    method: "GET",
    headers: {
      //futuramente inserir token
      accept: "application/json",
      "content-type": "application/json"
    },
  })

  console.log(response.status, response.statusText)
  console.log(response.headers)
  const responseBody = await response.json()
  console.log(responseBody)

  if (!response.ok)
  {
    const error = new Error(`Request failed with code ${response.status}`)
    error.response = response
    error.responseBody = responseBody
    throw error
  }

  return responseBody;
}

//consultar leituras da data x
async function LeiturasDia(){

  const response = await fetch(`${server}/leiturasDia/`,{
    method: "GET",
    headers: {
      accept: "application/json"
    },
  })
  
  console.log(response.status, response.statusText)
  console.log(response.headers)
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

  const id = "1"
  const parametro = 472
  const idAmbiente = "1"
  const data = "2022-08-10"

  const [infoAmbientes, fetchInfoAmbientes] = useFetch(`${server}/infoAmbientes/${encodeURIComponent(id)}`)
  const [leiturasDias, fetchLeiturasDias] = useFetch(`${server}leiturasDia/${encodeURIComponent(parametro)}/${encodeURIComponent(idAmbiente)}/${encodeURIComponent(data)}}`)

  const loginBody = JSON.stringify({
    //senha: teste
    usr: "heitor1", 
    pass: "698dc19d489c4e4db73e28a713eab07b"
  })
  const [login, fetchLogin] = useFetch(`${server}/loginAirPure`, {
    method : "POST",
    body : loginBody
  })

  return (
   <>   
    <button onClick={() => fetchLogin()}> Teste Login </button>  
    <button onClick={() => fetchInfoAmbientes()}>Teste Info Ambiente</button>
    <button onClick={() => fetchLeiturasDias()}>Teste Leituras Dia</button>
    <button onClick={() => UltimaLeitura()}>Teste Ultima Leitura</button>
    {/* {(login.isFetching || login.didFetch) && (
      <pre style={{textAlign:"left"}}>{JSON.stringify({login}, null, 2)}</pre>
    )} */}
    {/* <pre style={{textAlign:"left"}}>{JSON.stringify({infoAmbientes}, null, 2)}</pre> */}
    {/*infoAmbientes.willFetch && <p>Fazendo nada em relação a info ambientes...</p> */}
    {infoAmbientes.isFetching && <p>Baixando info ambientes...</p>}
    {infoAmbientes.didSucceed && (
      infoAmbientes.data.map(infoAmbiente => (
        <InfoAmbiente {...infoAmbiente} />
      ))
    )}

    {leiturasDias.isFetching && <p>Baixando leituras dia...</p>}
    {leiturasDias.didSucceed && (
      leiturasDias.data.map(LeiturasDia => (
        <LeiturasDia {...LeiturasDia} />
      ))
    )}


  </>
  )
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

function LeiturasDia({ id, sala, predio, local, dimensao, capmaxima, id_parametros }) {
  return (
    <>
    <h2>Sala: {sala}</h2>
    <h3>Prédio: {predio}</h3>
    <h3>Local: {local}</h3>
    </>
  )
}


export default App