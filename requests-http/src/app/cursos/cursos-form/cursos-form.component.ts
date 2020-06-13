import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submited = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(254)]]
    });
  }

  hasError(field: string)
  {
    return this.form.get(field).errors;
  }

  onSubmit()
  {
    this.submited = true;
    console.log(this.form.value);
    if (this.form.valid) {
      alert('submit');
    }
    else {
      alert('formulario invalido');
    }





  }
  onCancel() {
    this.submited = false;
    this.form.reset();
//    alert('cancel');

  }

}
