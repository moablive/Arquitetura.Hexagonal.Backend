import ProvedorCriptografia from "@/core/usuario/service/ProvedorCriptografia";
import bcrypt from "bcrypt";

export default class SenhaBcrypt implements ProvedorCriptografia{
    criptografar(texto: string): string {
        const salt = bcrypt.genSaltSync(10)  
        return bcrypt.hashSync(texto, salt) 
    }
}