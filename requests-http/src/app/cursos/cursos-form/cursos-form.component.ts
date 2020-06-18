import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Curso } from '../curso';
import { map, switchMap, exhaustMap } from 'rxjs/operators';

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
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
  /*/  this.route.params.subscribe(
      (params:any) =>{
        // const id = params.id both ways works
        const id = params['id'];
        alert( this.service.loadById(id));
        const curso$ = this.service.loadById(id);
        curso$.subscribe(curso => {
          this.updateform(curso);

        })
      }
    )
    /*/
      // the same code refactored
    this.route.params.pipe(
      map((params:any) =>params['id']),
      switchMap(id=> this.service.loadById(id)),
     // switchMap(cursos=> obteraulas()), if necessary



    ).
    subscribe(curso =>this.updateform(curso) );

    // to know
    // concat map -> ordem da requisicao importa
    // merge map -> ordem nao importa // mais rapido
    // exhaustMap -> casos de login so comeca a segunda quando terminar a primeira



    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(254)]]
    });
  }

  updateform(curso)
  {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome

    })

  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submited = true;
    console.log(this.form.value);
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        () => {
          this.modal.showAllertSuccess('Curso Cirado com sucesso');
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
