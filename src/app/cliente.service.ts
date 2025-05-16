import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES"; //aqui definimos a chave para o storage _CLIENTES mas poderia ser outra strinh

  constructor() { }

  salvar (cliente: Cliente){
    const storage = this.obterStorage(); //obtendo a lista lá do localStorage, que já pode ter dados ou ser uma lista vazia
    if(storage.some(x => x.cpf === cliente.cpf )){
      console.log("ERROR! cpf já cadastrado");
      return;
    }
    if(cliente.cpf && cliente.dataNascimento && cliente.email && cliente.nome){
      storage.push(cliente);//adiciono o cliente que chego como parametro no metodo
    }else{
      console.log("Existem dados incompletos");
      return;
    }
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    /*por ultimo guarda a lista novamente, mas agora com o novo cliente, 
    usando a etiqueta (chave), REPO_CLIENTES, que é na verdade _CLIENTES
    como o localStorage só aceita texto, ele usa o JSON.stringfy() para transformar um array de clientes
    que é um objeto JS em texto puro*/
  }

  pesquisarClientes(nomeBusca : string) : Cliente [] /* << retorno*/{
    const clientes = this.obterStorage();
    if(!nomeBusca){
      return clientes;
    }

    return clientes.filter(x => x.nome?.includes(nomeBusca));
  }

  private obterStorage() : Cliente[]{
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioClientes){
      //quando já houver dados no localStorage, iremos retornar um array com as informações do Storage
      const clientes : Cliente [] = JSON.parse(repositorioClientes);
      return clientes;
    }
     // No primeira vez que o metodo for chamado, 
      // iremos passar direto para essa parte do codigo, 
      // e retornaremos um array de storage vazio.
    const clientes : Cliente [] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  buscarClientePorId(id : string) : Cliente | undefined {//é possivel declarar 2 retornos -\0/
    const clientes = this.obterStorage();
    return clientes.find(x => x.id === id);
  }

  atualizar(cliente : Cliente){
    const storage = this.obterStorage();
    storage.forEach(x => {
      if(x.id === cliente.id){
        Object.assign(x, cliente); //substitu a assinatura, troca o Objeto por outro que chegou no parametro
      }
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));

    })
  }

  deletar(cliente : Cliente){
    const storage = this.obterStorage();
    const novaListaDeClientes = storage.filter( x => x.id !== cliente.id);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaListaDeClientes));

  }


}
