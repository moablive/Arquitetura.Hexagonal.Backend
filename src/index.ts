import dotenv from 'dotenv'
import express  from 'express'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario';
import LoginUsuario from "@/core/usuario/service/LoginUsuario"
import RepositorioUsuarioPg from './external/db/RepositorioUsuarioPg';
import SenhaBcrypt from './external/auth/SenhaBcrypt';
import RegistrarUsuarioController from './external/api/RegistrarUsuarioController';
import LoginUsuarioController  from './external/api/LoginUsuarioController';
import obterProdutoPorId from '@/core/produto/service/obterProdutoPorId';
import oberProdutoPorIdController from "@/external/api/oberProdutoPorIdController"
import UsuarioMiddleware from "@/external/api/UsuarioMiddleware"

dotenv.config()
const app = express()
const porta = process.env.API_PORT ?? 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(porta, () =>{
    console.log(`🔥 Servidor Rodando na porta:${porta}! 🔥`)
})


// ============== ROTAs Abertas =================== //
const repositorioUsuario = new RepositorioUsuarioPg()
const provedorCripto = new SenhaBcrypt

const registrarUsuario = new RegistrarUsuario(
    repositorioUsuario,
    provedorCripto
)
new RegistrarUsuarioController(app, registrarUsuario)


const loginUsuario = new LoginUsuario(
    repositorioUsuario,
    provedorCripto
)
new LoginUsuarioController(app, loginUsuario)



// =============== FECHADAS ======= //
const usuarioMid = UsuarioMiddleware(repositorioUsuario)

const pegarProdutoPorId = new obterProdutoPorId()
new oberProdutoPorIdController(app, pegarProdutoPorId, usuarioMid)

