import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http'; used befor V6
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ReturnStatement } from '@angular/compiler/src/output/output_ast';

/*/
  used to test the post
  https://resttesttest.com/#

/*/
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  };
  xcep: string;
  bkbCep: string;

  onSubmit(form) {
//    console.log(form.value);
//    console.log(this.usuario);
    console.log(form);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .subscribe(dados => {
      console.log(dados);
      form.form.reset();

    });


  }

  constructor(private http: HttpClient,
    private cepService: ConsultaCepService ) { }

  ngOnInit() {
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;

  }



  populaDadosForm(dados, formulario, cep) {
    /*/formulario.setValue(


     {
       nome : formulario.value.nome,
       email : formulario.value.email,
       endereco : {
         cep :   this.formatCep(cep) ,
         numero : ''  ,
         complemento:  dados.tipo_logradouro   ,
         rua : dados.logradouro  ,
         bairro : dados.bairro   ,
         cidade : dados.cidade  ,
         estado : dados.uf
      }
    });/*/

    if (!('debug' in dados)) {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        this.xcep = this.formatCep(cep); } else {
          this.xcep = this.bkbCep;
        }


      formulario.form.patchValue({
        endereco : {
          cep :   this.xcep ,
          complemento:  dados.tipo_logradouro   ,
          rua : dados.logradouro  ,
          bairro : dados.bairro   ,
          cidade : dados.cidade  ,
          estado : dados.uf
      }      }
      );
    } else {
      alert('cep nao encontrado');


   }

  }


  resetaDadosForm(formulario) {

    formulario.form.patchValue({
      endereco : {
        complemento:  null  ,
        rua : null  ,
        bairro : null   ,
        cidade : null  ,
        estado : null
     }      }
    );


  }

  aplicaCssErro(campo) {
    return {
      'has-error':    this.verificaValidTouched(campo) ,
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  formatCep(cep: any) {
   return cep.substring(0, 5) + '-' + cep.substring(5, 8);

  }

  consultaCep(cep, form) {

    this.resetaDadosForm(form);
    this.bkbCep = cep;

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, ''); // Expressao regular que faz a subistituicao de qualquer valor nao numerico

    if (cep != null && cep !== '') {
      this.cepService.consultaCep(cep)
        .subscribe(dados => this.populaDadosForm(dados, form, cep));
    }


    // Verifica se campo cep possui valor informado.

  }
}
