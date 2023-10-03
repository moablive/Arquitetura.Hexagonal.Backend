import { Request, Response, NextFunction } from "express"
import Usuario from "@/core/usuario/model/Usuario"
import RepositorioUsuario from "@/core/usuario/service/RepositorioUsuario"
import ProvedorJwt from "@/external/api/ProvedorJwt"

export default function UsuarioMiddleware(repositorio: RepositorioUsuario) {
    return async (req:Request, resp:Response, next:NextFunction) => {
        const acessoNegado = () => resp.status(403).send('Token Invalido')
        const token = req.headers.authorization?.replace('Bearer','')

        if(!token) {
            acessoNegado()
            return
        }

        const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!)
        const usuarioToken = provedorJwt.obter(token) as Usuario
        const usuario = repositorio.buscarPorEmail(usuarioToken.email)

        if(!usuario){
            acessoNegado()
            return
        }

        (req as any).usuario = usuario

        next()
    }
}
