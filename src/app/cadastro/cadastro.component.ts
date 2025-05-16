import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask'
import { BrasilApiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule, 
    MatCardModule, 
    FormsModule,
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule,
  ], 
  providers : [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando : boolean = false; //uma flag para saber se estamos atuzal. ou cadastrando um cliente
  snackBar : MatSnackBar = inject(MatSnackBar);
  estados : Estado [] = [];
  municipios : Municipio [] = [];

  constructor(
    private service: ClienteService,
    private route : ActivatedRoute, //captura dados da rota acessada
    private router : Router,
    private brasilApiService : BrasilApiService
  ){ }
  
ngOnInit(): void {
  this.route.queryParamMap.subscribe((x: any) => {
    const params = x['params'];
    const id = params['id'];                                                                
    
    if (id) {
      const clienteBusca = this.service.buscarClientePorId(id);
      if (clienteBusca) {
        this.atualizando = true;
        this.cliente = clienteBusca;
        if(this.cliente.estado){
          const event = {value : this.cliente.estado};
          this.carregarMunicipios(event as MatSelectChange);
        }
      } else {
        // Cliente não encontrado, mantém como novo cadastro
        this.atualizando = false;
        this.cliente = Cliente.newCliente();
      }
    } else {
      // Sem ID na rota, mantém como novo cadastro
      this.atualizando = false;
      this.cliente = Cliente.newCliente();
    }
  });
  this.carregarUfs();
}
limpar(){
  this.cliente = Cliente.newCliente();
  this.atualizando = false;
  this.openSnackBar('Formulario reiniciado.')
}
salvar(){
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.openSnackBar('Cliente salvo com sucesso.')
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta'])
      this.openSnackBar('Cliente atualizado com sucesso.')
    }
    
   
  }

  openSnackBar(mensagem: string) {
    this.snackBar.open(mensagem, 'OK!', {duration: 5000});
  }

  carregarUfs(){
    this.brasilApiService.listarUfs().subscribe(
      {
      next: listaDeEstados => this.estados = listaDeEstados.sort((a, b) => a.nome.localeCompare(b.nome)),
      error: erro => console.log('ERROR ', erro)
      }
    );
  }

  carregarMunicipios(event : MatSelectChange ){
    const uf = event.value;
    this.brasilApiService.listarMunicipios(uf).subscribe(
      {
      next: listaDeMunicipios => this.municipios = listaDeMunicipios.sort((a,b) => a.nome.localeCompare(b.nome)),
      error: erro => console.log('Ocorreu um erro ', erro)
      }
    );
  }

}
