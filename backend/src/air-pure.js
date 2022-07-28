import fetch from "node-fetch";

// const server = 'https://jsonplaceholder.typicode.com'
// function GetTemp(){
//     fetch('https://jsonplaceholder.typicode.com/todos/').then((response) => {
//         //após receber retorno da promise (response)
//         console.log(response)
//         response.json()
//     })
// }
// GetTemp();

const server = 'https://backend-api-airpure.vercel.app'

//primeiro precisa fazer login no dispositivo
function LoginAirPure(){
    fetch(`${server}/api/login`)
        .then((response) => {
        console.log(response.json())        
    })
}

//obtendo infos do ambiente
function GetInfoAmbientes(){
    fetch(`${server}/api/ambientes/{id}`)
        .then((response) => {
        console.log(response.json())        
    })
}

//consulta leituras da data x
function GetLeiturasDia(){
    fetch(`${server}/api/mediaDia/{parametro}/{idAmbiente}/{data}`)
        .then((response) => {
        console.log(response.json())        
    })
}

//consulta leituras da data x
function GetLeiturasDia(){
    fetch(`${server}/api/mediaDia/{parametro}/{idAmbiente}/{data}`)
        .then((response) => {
        console.log(response.json())        
    })
}