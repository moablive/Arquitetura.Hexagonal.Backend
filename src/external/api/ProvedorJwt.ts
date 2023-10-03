import jwt from 'jsonwebtoken'
export default class  ProvedorJwt {
    constructor(private segredo: string) {}
    gerar(dados: string | object){
        return jwt.sign(dados, this.segredo,{
            expiresIn: "1d",
        })
    }
    obter(token: string): string | object{
        return jwt.verify(token, this.segredo)
    }
}
