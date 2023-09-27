import dotenv from 'dotenv'
import express  from 'express'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario';
import RepositorioUsuarioPg from './external/db/RepositorioUsuarioPg';
import SenhaBcrypt from './external/auth/SenhaBcrypt';
import RegistrarUsuarioController from './external/api/RegistrarUsuarioController';

dotenv.config() 
const app = express()
const porta = process.env.API_PORT ?? 4000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(porta, () =>{
    console.log(`🔥 Servidor Rodando na porta:${porta}! 🔥`)
})


// ============== ROTAs Abertar =================== //
const repositorioUsuario = new RepositorioUsuarioPg()
const provedorCripto = new SenhaBcrypt
const registrarUsuario = new RegistrarUsuario(
    repositorioUsuario,
    provedorCripto
)
new RegistrarUsuarioController(app, registrarUsuario)