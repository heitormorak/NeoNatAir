import express from 'express'
import cors from 'cors'
import { LoginAirPure, GetInfoAmbientes, GetLeiturasDia, GetUltimaLeitura  } from './air-pure.js'

const app = express()

app.use(express.json())
app.use(cors())

//rotas para air-pure.js 
app.post('/loginAirPure', LoginAirPure)
app.get('/infoAmbientes/:id', GetInfoAmbientes)
app.get('/leiturasDia/:parametro/:idAmbiente/:data', GetLeiturasDia)
app.get('/ultimaLeitura/:idAmbiente', GetUltimaLeitura)


app.listen(8080,()=>{
    console.log("listen")
})