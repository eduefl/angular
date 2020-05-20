import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
// import { Http } from '@angular/http'; //used before V6
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  submit = true;
  // estados: EstadoBr[];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsLetterOp: any[];

  xcep: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService


  ) { }

  ngOnInit() {

    this.estados        = this.dropdownService.getEstadosBr();
    this.cargos         = this.dropdownService.getcargos();
    this.tecnologias    = this.dropdownService.gettecnologias();
    this.newsLetterOp   = this.dropdownService.geNewsLetter();



    /*/this.dropdownService.getEstadosBr()
      .subscribe(dados => {
          this.estados = dados;
          console.log(dados);
        }
        );/*/
  // tslint:disable: max-line-length
    /*/this.formulario = new FormGroup( {

      nome    : new FormControl(null,Validators.required),
      // tslint:disable-next-line: max-line-length
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

    this.formulario = this.formBuilder.group({
      nome    : [null, Validators.required],
      email   : [null, [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')]],
      endereco : this.formBuilder.group({
        cep         : [null, Validators.required],
        numero      : [null, Validators.required],
        complemento : [null],
        rua         : [null, Validators.required],
        bairro      : [null, Validators.required],
        cidade      : [null, Validators.required],
        estado      : [null, Validators.required]
      }),
      cargo       : [null],
      tecnologia  : [null],
      newsLetter  : ['y'],
      termos      : [false, Validators.pattern('true')]
    });



  }

  onSubmit() {
    if (this.submit) {
      if (this.formulario.valid) {
        console.log(this.formulario);

        this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe(dados => {
          console.log(dados);
          // Reser FOrm
          this.formulario.reset();
          },
          // cath error
          (error: any) => alert('Something Wrong')
        );
      } else {
        alert('formulario invalido');
        /*/
        Object.keys(this.formulario.controls).forEach(function(campo){

        });/*/

        this.checkFormValid(this.formulario);

      }

    } else {
      this.submit = true;
    }

  }

  resetForm() {
    if ( confirm('do you really want to reset the form ?') === true ) {
      this.formulario.reset();
    } else {
      alert('ok');
    }
    this.submit = false;
    return null;

  }

  checkFormValid(formGroup: FormGroup ) {

    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if ( controle instanceof FormGroup) {
        this.checkFormValid(controle);
      }
    });



  }

  verificaValidTouched(campo: string) {
    // this.formulario.controls[campo]; //do the same  as the next line
    // this.formulario.get(campo) //do the same  as the previous line

    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);

  }
  verificaInvalidEmail() {
    const mailField = this.formulario.get('email');
   // console.log(mailField.errors);
    if (mailField.errors) {
      return mailField.errors['pattern'] && mailField.touched;
      // in my case is different fro  the example because i use pattern not the propery e-mail.


    }
  }


  aplicaCssErro(campo: string) {
    return {
      'has-error':    this.verificaValidTouched(campo) ,
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
  consultaCep() {

    const cep = (this.formulario.get('endereco.cep').value).replace(/\D/g, '') ; // Nova variável "cep" somente com dígitos.
    this.resetaDadosForm();

    if (cep != null && cep !== '') {
        this.cepService.consultaCep(cep)
          .subscribe(dados => this.populaDadosForm(dados,  cep));
      }

  }


  populaDadosForm(dados, cep) {

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
          this.xcep = this.formulario.get('endereco.cep').value;
        }


      this.formulario.patchValue({
        endereco : {
          cep :   this.xcep ,
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
    } else {
      alert('cep nao encontrado');


   }

  }

  formatCep(cep: any) {
    return cep.substring(0, 5) + '-' + cep.substring(5, 8);

   }


  resetaDadosForm() {

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

  setCarg() {
    const cargo =  {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);

  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2 ;

  }

  setTec() {
    this.formulario.get('tecnologia').setValue(['vb6', 'advpl']);

  }


}
