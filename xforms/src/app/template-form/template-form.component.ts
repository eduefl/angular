import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form){
//    console.log(form.value);
//    console.log(this.usuario);
    console.log(form)
    

  }

  constructor(private http: Http) { }

  ngOnInit() {
  }

  verificaValidTouched(campo)
  {
    return !campo.valid && campo.touched

  }

  consultaCep(cep){

    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, ''); // Expressao regular que faz a subistituicao de qualquer valor nao numerico

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        /*/Important 
          In the original example was used the webservice from ViaCep
          But it is blocked in Russia so as an alternative i have used
          republicavirtual that has access here so some adapt probably will be necessary.

          Remembering that this block happens in Chrome only so if it  is needed we can test in
           opera wit viacep but also as a chalenge lets try do it with the new webservice.

        /*/
        // this.http.get("https://viacep.com.br/ws/"+ cep +"/json"); // Also possible
        //this.http.get(`https://viacep.com.br/ws/${cep}/json`)
        this.http.get(`http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`)         
        .map(dados => dados.json())
        .subscribe(dados => console.log(dados));


      }



    }



    //console.log(cep);

  }

  aplicaCssErro(campo){
    return {
      'has-error':    this.verificaValidTouched(campo) ,
      'has-feedback': this.verificaValidTouched(campo)   
    }
  }

}
