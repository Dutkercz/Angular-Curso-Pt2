import {v4 as uuid} from 'uuid';

export class Cliente {
    id?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    email?: string;
    deletando?: boolean;
    cidade?: string;
    estado?: string;

    static newCliente(){
        const cliente = new Cliente();
        cliente.id = uuid();
        cliente.deletando = false
        return cliente;
    }
}