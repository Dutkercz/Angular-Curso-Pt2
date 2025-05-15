import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule} from '@angular/flex-layout'
import { MatIconModule} from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

  nomeBusca: string = '';
  listaClientes : Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento'];
  
  constructor(private service : ClienteService){ }

  ngOnInit(): void{
    //Metodo que chama os dados a serem carregados dentro do clico de vida da tela 
    // carrega e mostra a tela > carrega os dados
    //Add 'implements OnInit' to the class.
    
  const clientes = this.service.pesquisarClientes('');
  console.log('Clientes recebidos:', clientes);
  this.listaClientes = clientes;
    
  }

  pesquisar(){
    this.service.pesquisarClientes(this.nomeBusca)
  }


}
