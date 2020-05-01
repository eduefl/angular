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

      nome: new FormControl(null),
      email: new FormControl(null)
    });/*/

    this.formulario= this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null,[Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]]      
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

}
