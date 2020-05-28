import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckBox(min = 0) {
    const validator = ( formArray: FormArray ) => {
      const values = formArray.controls;
      if (values.length > 0) {
        if (!values[0].root.root || !(<FormGroup>values[0].root.root).controls) {

         return null;
        } else {

         // console.log('sim e ');
         // console.log(values[0].root);
          const field = (<FormGroup>values[0]).root.get('qtdFrw');
          if (field !== null) {
           // console.log(field.value);
            min = field.value;
          }
        }

      }

     /*/ for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1 ;
        }
      } /*/
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce(((total, current) => current ? total + current : total) , 0 );
        return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {

    let cep = control.value;


    if (cep && cep !== '' ) {
      if (cep.length >= 7) {
        if (cep.substr(5, 1) === '-') {
          cep = cep.substr(0, 5)  + cep.substr(6, cep.length);
          console.log(cep);
        }


      }

      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equalsTo(otherField: string) {

    const validator = ( formControl: FormControl ) => {
      if (otherField == null) {

        throw new Error ('é necessario informar um campo');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {

        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error ('é necessario informar um campo existente na raiz');

      }

      if (field.value !== formControl.value ) {
        return { equalsTo: otherField };
      }

      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any ) {
    console.log(validatorValue);
    const config = {
      'required': `${fieldName} is mandatory`,
      'minlength': `${fieldName} needs at least ${validatorValue.requiredLength} chars.`,
      'maxlength': `${fieldName} can have maximun  ${validatorValue.requiredLength} chars.`,
      'cepInvalido': 'cep invalido',
      'min': `${fieldName} minimum value is   ${validatorValue.min} .`,



    };
    return config[validatorName];
  }
}

