import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/form-validations';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
// import { Http } from '@angular/http'; //used before V6
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  nMinCheckBox =  1;
  opCfrW = [1, 2, 3, 4];

  frameworks =  ['Angluar', 'React', 'Vue', 'Sencha'];

  xcep: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService


  ) { }

  ngOnInit() {


    // this.verificaEmailService.verificarEmail('email@email.com').subscribe();

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
      nome          : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)] ],
      email         : [null, [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')]
                          , [this.validarEmail.bind(this) ]],
      confirmEmail  : [null, [FormValidations.equalsTo('email')]],
      endereco      : this.formBuilder.group({
        cep           : [null, [Validators.required, FormValidations.cepValidator]],
        numero        : [null, Validators.required],
        complemento   : [null],
        rua           : [null, Validators.required],
        bairro        : [null, Validators.required],
        cidade        : [null, Validators.required],
        estado        : [null, Validators.required]
      }),
      cargo       : [null],
      tecnologia  : [null],
      newsLetter  : ['y'],
      termos      : [false, Validators.pattern('true')],
      qtdFrw      : [0, Validators.min(1)],
      frameworks  : this.buildFrameworks()
    });
  }

  buildFrameworks() {
   // console.log();
    const values = this.frameworks.map(v => new FormControl(false));
    const ret = this.formBuilder.array(values , FormValidations.requiredMinCheckBox() );
   // console.log(ret);
    return ret ;

    /*/return[
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]/*/


  }

  onSubmit() {
    if (this.submit) {
     // console.log(this.formulario);

     let valueSubmit = Object.assign({  }, this.formulario.value);

     valueSubmit = Object.assign (valueSubmit, {
       frameworks: valueSubmit.frameworks
       .map((v, i) => v ? this.frameworks[i] : null)
       .filter(v => v !== null )
     });

//     console.log(valueSubmit);


      if (this.formulario.valid) {

        this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe(dados => {
          // console.log(dados);
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
      // console.log(campo);
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

  verificaValidRequired(campo: string) {

    return this.formulario.get(campo).hasError('required') && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);

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

    let cep =  this.formulario.get('endereco.cep').value ;
    this.resetaDadosForm();

    if (cep != null && cep !== '') {
      cep = cep.replace(/\D/g, '');
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
    console.log('aqui');
    console.log(this.nMinCheckBox);
    this.nMinCheckBox = 3;
    const cargo =  {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);

  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2 ;

  }

  setTec() {
    this.formulario.get('tecnologia').setValue(['vb6', 'advpl']);

  }
  getQtsFrm() {
    return this.formulario.get('qtdFrw').value ;
  }
  getStrOpc() {
    let cMessage: string;
    if (this.formulario.get('qtdFrw').value < 2) {
      cMessage = 'opcao';
    } else {
      cMessage = 'opcoes';

    }

    return cMessage;
  }

  validarEmail(formControl: FormControl) {

    this.formulario.get('confirmEmail').setValue(this.formulario.get('confirmEmail').value );

    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map( emailexiste => emailexiste ? {emailInvalid: true } : null ));
  }

  kindOfMagic() {
    // console.log(    this.formulario.get('frameworks')   );

    // console.log(    this.formulario.get('frameworks').value    );

    this.formulario.get('frameworks').setValue(this.formulario.get('frameworks').value );
    console.log(    this.formulario.get('frameworks').value    );

  }


}


