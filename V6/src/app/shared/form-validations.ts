import { FormArray, FormControl } from '@angular/forms';

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
        if (cep.substr(5,1) ==='-')
        {
          cep = cep.substr(0,5)  + cep.substr(6,cep.length);
          console.log(cep);
        }


      }

      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }
}

