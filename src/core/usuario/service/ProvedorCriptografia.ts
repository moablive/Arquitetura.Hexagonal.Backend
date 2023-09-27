// Na arquitetura Hexagonal esta interface é uma porta 
//a Porta Faz Parte do Core do APP
export default interface ProvedorCriptografia {
    criptografar(texto: string): string
}