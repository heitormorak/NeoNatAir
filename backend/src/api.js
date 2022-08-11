import express from 'express'
import cors from 'cors'
import { LoginAirPure, GetInfoAmbientes, GetLeiturasDia, GetUltimaLeitura  } from './air-pure.js'

import { GetAmostragens } from './routes/amostragem.js'

const app = express()
const port = 8080;

app.use(express.json())
app.use(cors())

//rotas para air-pure.js 
app.post('/loginAirPure', LoginAirPure)
app.get('/infoAmbientes', GetInfoAmbientes)
app.get('/leiturasDia', GetLeiturasDia)
app.get('/ultimaLeitura', GetUltimaLeitura)

//rotas NeoNatAir
app.get('/api/amostragens', GetAmostragens);


app.listen(port,()=>{
    console.log(`Server is running in the port: ${port}`)
})