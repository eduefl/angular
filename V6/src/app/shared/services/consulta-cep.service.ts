import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient ) { }

  consultaCep(cep: string) {



    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;
      // Valida o formato do CEP.
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
        return this.http.get(`http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`);



      } else {
        alert('cep em formato invalido');
        return of ({});


      }
    }
  }

}
