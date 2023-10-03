import { Express } from "express"
import obterProdutoPorId from "@/core/produto/service/obterProdutoPorId"
export default class oberProdutoPorIdController {

    constructor (
        servidor: Express,
        casoDeUso: obterProdutoPorId,
        ...middlewares: any[]
    ){
        servidor.post('/api/produtos/:id',
            ...middlewares
            ,async (req, resp) => {
                try {
                    const produto = await casoDeUso.executar((req.params as any).id)
                    resp.status(200).send(produto)
                } catch (erro: any) {
                    resp.status(400).send(erro.message)
                }
            })
    }

}
