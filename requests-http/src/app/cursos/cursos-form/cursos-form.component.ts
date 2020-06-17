import { Router } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submited = false;

  constructor(private fb: FormBuilder,
     private service: CursosService,
      private modal: AlertModalService,
      private location: Location,
      private router: Router
      ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(254)]]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submited = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        () => {this.modal.showAllertSuccess('Curso Cirado com sucesso');
        // this.location.back(); to back to previouws pagge not very effective avoid to use
        this.router.navigate(['/']);

      },
        () => this.modal.showAllertDanger('Erro ao criar curso'),
        () => console.log('request OK')
      );



    } else {
      alert('formulario invalido');
    }





  }
  onCancel() {
    this.submited = false;
    this.form.reset();
//    alert('cancel');

  }

}
