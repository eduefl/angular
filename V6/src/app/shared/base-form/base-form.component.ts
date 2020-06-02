import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;
  formSubmitAttempt = false;
  lSub = true;


  constructor() { }

  ngOnInit() {
  }

  abstract submit();
  onSubmit() {
    if (this.lSub) {
      this.formSubmitAttempt = true;
      if (this.formulario.valid) {
        this.submit();
      } else {
        alert('formulario invalido');
      // this.checkFormValid(this.formulario);
      }
    } else {
      this.lSub = true;
    }


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
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }


  checkFormValid(formGroup: FormGroup | FormArray) {

    Object.keys(formGroup.controls).forEach(campo => {
      // console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.checkFormValid(controle);
      }
    });
  }


}
