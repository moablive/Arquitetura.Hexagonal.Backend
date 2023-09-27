import ProvedorCriptografia from "../../core/usuario/service/ProvedorCriptografia";

// Na arquitetura Hexagonal esta class é um ADPTADOR
// O ADPTADOR NÂO!!!  Faz Parte do Core do APP
export default class InverterSenhaCripto implements ProvedorCriptografia{
    criptografar(senha: string): string { 
        return senha
        .split('')
        .reverse()
        .join('');
    }
}