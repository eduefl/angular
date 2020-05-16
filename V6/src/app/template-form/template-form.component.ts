import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http'; used befor V6
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  onSubmit(form) {
//    console.log(form.value);
//    console.log(this.usuario);
    console.log(form);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map (res => res ))
    .subscribe(dados => {
      console.log(dados);
      form.form.reset();

    });


  }

  constructor(private http: HttpClient ) { }

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
      formulario.form.patchValue({
        endereco : {
          cep :   this.formatCep(cep) ,
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

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, ''); // Expressao regular que faz a subistituicao de qualquer valor nao numerico

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {


      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;



      //  Valida o formato do CEP.
      if (validacep.test(cep)) {
           /*/Important
          In the original example was used the webservice from ViaCep
          But it is blocked in Russia so as an alternative i have used
          republicavirtual that has access here so some adapt probably will be necessary.

          Remembering that this block happens in Chrome only so if it  is needed we can test in
           opera wit viacep but also as a chalenge lets try do it with the new webservice.

        /*/
        // this.http.get("https://viacep.com.br/ws/"+ cep +"/json"); // Also possible
        // this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        this.http.get(`http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`)
        .subscribe(dados => this.populaDadosForm(dados, form, cep));


      } else {
        alert('cep em formato invalido');


      }



    }
  }
}
