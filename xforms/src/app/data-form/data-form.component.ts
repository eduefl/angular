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
      email   : new FormControl(null,[Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&�*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]),
      endreco : new FormGroup({
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
      email   : [null,[Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&�*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]],      
      endreco : this.formBuilder.group({
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


}
