import express from 'express'
import cors from 'cors'
import { LoginAirPure, GetInfoAmbientes, GetLeiturasDia, GetUltimaLeitura  } from './air-pure.js'

import { GetAmostragens } from './routes/amostragem.js'
import { conexao } from './models/db.js'
import { GetAirPures } from './routes/airpure.js'
import { GetLeitos } from './routes/leito.js'
import { GetUsuarios, GetAdministradores, GetEquipesTecnicas } from './routes/usuario.js'

//iniciando banco
await conexao.sync();

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
app.get('/api/airpures', GetAirPures);
app.get('/api/leitos', GetLeitos);
app.get('/api/usuarios', GetUsuarios);
app.get('/api/administradores', GetAdministradores);
app.get('/api/equipestecnicas', GetEquipesTecnicas);


app.listen(port,()=>{
    console.log(`Server is running in the port: ${port}`)
})
