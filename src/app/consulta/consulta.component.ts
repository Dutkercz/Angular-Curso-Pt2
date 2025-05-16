import { Component, OnInit, inject } from '@angular/core';
import {CommonModule} from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule} from '@angular/flex-layout'
import { MatIconModule} from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import {MatSnackBar} from '@angular/material/snack-bar';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask'

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
  providers: [provideNgxMask()],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

  nomeBusca: string = '';
  listaClientes : Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento', 'estado', 'cidade', 'acoes'];
  deletando : boolean = false;
  snackbar = inject(MatSnackBar);
  
  constructor(
    private service : ClienteService,
    private router : Router //navegar entre rotas
  ){ }

  ngOnInit(): void{
    //Metodo que chama os dados a serem carregados dentro do clico de vida da tela 
    // carrega e mostra a tela > carrega os dados
    //Add 'implements OnInit' to the class.
    
  const clientes = this.service.pesquisarClientes('');
  console.log('Clientes recebidos:', clientes);
  this.listaClientes = clientes;
    
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  prepararParaEdicao(id: string){
    this.router.navigate(['/cadastro'], {queryParams: { "id": id }} ); // essa rota é definida em app.route.ts
  }

  preparaDeletar(cliente : Cliente){
    cliente.deletando = true;
  }
   
  deletarCliente(cliente : Cliente){
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.deletando = false;
    this.mostrarSnackMensagem('Cliente deletado.')
  }

  mostrarSnackMensagem(mensagem : string){
    this.snackbar.open(mensagem, 'OK!');
  }


}
