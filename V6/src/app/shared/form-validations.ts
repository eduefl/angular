import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckBox(min = 1) {
    const validator = ( formArray: FormArray ) => {
      /*/const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1 ;
        }
      }/*/
      console.log(formArray.controls);
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce(((total, current) => current ? total + current : total) , 0 );
        return totalChecked >= min ? null : { required: true };
    };
    console.log(validator);
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
    const config = {
      'required': `${fieldName} is mandatory`,
      'minlength': `${fieldName} needs at least ${validatorValue.requiredLength} chars.`,
      'maxlength': `${fieldName} can have maximun  ${validatorValue.requiredLength} chars.`,
      'cepInvalido': 'c&p invalido',
      'pattern': `${fieldName} is not valid.`,
      'emailInvalid': `${fieldName}  ja cadastrado!`,
      'equalsTo' :  `${fieldName}  do not match!`

    };
    return config[validatorName];
  }
}

