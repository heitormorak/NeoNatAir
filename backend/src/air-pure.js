import fetch from "node-fetch";

const server = 'https://backend-api-airpure.vercel.app'

const id = 1
const parametro = 472
const idAmbiente = 1
const data = "2022-07-27"

//primeiro precisa fazer login no dispositivo
export async function LoginAirPure(req,res){
    //console.log(JSON.stringify(req.body))
    
    const airPureResponse = await fetch(`${server}/api/login`,{
        method: "POST",
        headers:{
            accept : "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(req.body)
    })
    

    res.status(airPureResponse.status)
    res.json(await airPureResponse.json())

    teste = JSON.stringify(res)
    console.log("res:" , teste)

}


//obtendo infos do ambiente
export async function GetInfoAmbientes(req,res){
    const airPureResponse = await fetch(`${server}/api/ambientes/${id}`, {
        method: "GET",
        headers:{
            accept : "application/json", 
            "content-type": "application/json"
        },
        body: JSON.stringify(req.body)

    })
    res.status(airPureResponse.status)
    res.json(await airPureResponse.json())
}

//consulta leituras da data x
export async function GetLeiturasDia(req,res){
    const airPureResponse = await fetch(`${server}/api/mediaDia/${parametro}/${idAmbiente}/${data}`, {
        method: "GET",
        headers:{
            accept : "application/json",
        },
    })
    res.status(airPureResponse.status)
    res.json(await airPureResponse.json())
}

//consulta última leitura
export async function GetUltimaLeitura(req,res){
    const airPureResponse = await fetch(`${server}/api/ultimoValor/${idAmbiente}`, {
        method: "GET",
        headers:{
            accept : "application/json",
        },
    })
    res.status(airPureResponse.status)
    res.json(await airPureResponse.json())
}
