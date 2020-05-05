import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  submit: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private http : Http

  ) { }

  ngOnInit() {

    /*/this.formulario = new FormGroup( {

      nome    : new FormControl(null,Validators.required),
      email   : new FormControl(null,[Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]),
      endereco : new FormGroup({
        cep         : new FormControl(null,Validators.required),
        numero      : new FormControl(null,Validators.required),
        complemento : new FormControl(null,),
        rua         : new FormControl(null,Validators.required),
        bairro      : new FormControl(null,Validators.required),
        cidade      : new FormControl(null,Validators.required),
        estado      :  new FormControl(null,Validators.required)
      })
    });/*/

    this.formulario= this.formBuilder.group({
      nome    : [null, Validators.required],
      email   : [null,[Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]],      
      endereco : this.formBuilder.group({
        cep         : [null, Validators.required],
        numero      : [null, Validators.required],
        complemento : [null],
        rua         : [null, Validators.required],
        bairro      : [null, Validators.required],
        cidade      : [null, Validators.required],
        estado      : [null, Validators.required]
      })      
    })


  }

  onSubmit(){
    if (this.submit)
    {
      console.log(this.formulario);

      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .map (res => res )
      .subscribe(dados => {
        console.log(dados);
        // Reser FOrm
        this.formulario.reset();
        }, 
        // cath error 
        (error: any) => alert("Something Wrong")
        );
    }
    else{
      this.submit = true;
    }

  }

  resetForm(){
    if ( confirm("do you really want to reset the form ?") == true )
    {    
      this.formulario.reset();
    }
    else
    {
      alert("ok")
    }
    this.submit = false;
    return null

  }

  verificaValidTouched(campo: string)
  {
    //this.formulario.controls[campo]; //do the same  as the next line
    //this.formulario.get(campo) //do the same  as the previous line

    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched

  }
  verificaInvalidEmail()
  {
    let mailField = this.formulario.get('email');
   // console.log(mailField.errors);
    if (mailField.errors){
      return mailField.errors['pattern'] && mailField.touched;
      //in my case is different fro  the example because i use pattern not the propery e-mail.


    }
  }

  
  aplicaCssErro(campo: string){
    return {
      'has-error':    this.verificaValidTouched(campo) ,
      'has-feedback': this.verificaValidTouched(campo)   
    }
  }
  consultaCep(){
    
    let cep = this.formulario.get('endereco.cep').value

    this.resetaDadosForm();

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
        .subscribe(dados => this.populaDadosForm(dados,  cep));



      }
      else{
        alert('cep em formato invalido')


      }



    }
  }


  populaDadosForm(dados, cep)
  {
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

    if (!("debug" in dados)) {

      this.formulario.patchValue({
        endereco : { 
          cep :   this.formatCep(cep) ,
          complemento:  dados.tipo_logradouro   ,
          rua : dados.logradouro  ,
          bairro : dados.bairro   ,
          cidade : dados.cidade  ,
          estado : dados.uf  
      }      }
      );

      /*/ the same but with set value examples
      this.formulario.get('endereco').get('complemento').setValue(dados.tipo_logradouro); // this works  
      this.formulario.get('endereco.rua').setValue(dados.logradouro); //this also works 
      let adress = this.formulario.get('endereco'); // this also also works all these ways are correct
      adress.get('cep').setValue(this.formatCep(cep)); 
      adress.get('bairro').setValue(dados.bairro);
      adress.get('cidade').setValue(dados.cidade);
      adress.get('estado').setValue(dados.uf);
      /*/


//      this.formulario.get('nome').setValue('consultado');
    }
    else{
      alert('cep nao encontrado')
 
 
   }

  }

  formatCep(cep: any) {
    return cep.substring(0, 5) + "-" + cep.substring(5, 8);
   
   }
 

  resetaDadosForm(){
  
    this.formulario.patchValue({
      endereco : { 
        complemento:  null  ,
        rua : null  ,
        bairro : null   ,
        cidade : null  ,
        estado : null  
     }      }
    );
    

 

  }

}
