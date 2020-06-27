import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Curso } from '../curso';
import { map, switchMap, exhaustMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submited = false;
  view = false;
  edit = false;
  add = false;
  delete = false;


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

    if (this.route.snapshot.url[0].path === 'view') {
      this.view = true;
    } else if (this.route.snapshot.url[0].path === 'editar') {
      this.edit = true;
    } else if (this.route.snapshot.url[0].path === 'novo') {
      this.add = true;
    } else if (this.route.snapshot.url[0].path === 'delete') {
      this.delete = true;
    }




    /*/
        if (!this.add) {
          this.route.params.pipe(
            //      tap((params:any) =>console.log()),
            map((params: any) => params['id']),
            switchMap(id => this.service.loadById(id)),
            // switchMap(cursos=> obteraulas()), if necessary



          ).
            subscribe(curso => this.updateform(curso));

          // to know
          // concat map -> ordem da requisicao importa
          // merge map -> ordem nao importa // mais rapido
          // exhaustMap -> casos de login so comeca a segunda quando terminar a primeira

        }
    /*/
    const curso = this.route.snapshot.data['curso'];
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(254)]]
    });

    if (this.view || this.delete) {
      this.form.get('nome').disable();
    }



  }
  /*/
    updateform(curso) {
      this.form.patchValue({
        id: curso.id,
        nome: curso.nome

      });

    }
  /*/
  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submited = true;
    console.log(this.form.value);
    let ModMsg ;
    let ModTitle ;
    let modBtnOk ;
    let modBtnCanc ;

    if (this.form.valid) {
      let msgSuccess = '';
      let msgErro = '';
      if (this.add) {
        msgSuccess = 'Curso Cirado com sucesso';
        msgErro = 'Erro ao criar curso';
      } else if (this.edit) {
        msgSuccess = 'Curso alterado com sucesso';
        msgErro     = 'Erro ao alterar curso';
        ModMsg      =  `Confirma alteracao do curso ${this.form.get('id').value}?`;
        ModTitle    = `Alteracao curso ${this.form.get('id').value}!`;
        modBtnOk    = `Confirmar Alteracao `;
        modBtnCanc  = `Cancelar Alteracao `;
      } else if (this.delete) {
        msgSuccess = 'Curso excluido com sucesso';
        msgErro = 'Erro ao excluir curso';
        ModMsg      =  `Confirma delecao do curso ${this.form.get('id').value}?`;
        ModTitle    = `Deletar curso ${this.form.get('id').value}!`;
        modBtnOk    = `Confirmar Exclusao `;
        modBtnCanc  = `Cancelar Exclusao `;
      }

      // console.log(this.route.snapshot.url[0].path);
      this.service.salve(this.form.value, this.route.snapshot.url[0].path, msgSuccess, msgErro, !this.add,
        ModMsg, ModTitle, modBtnOk, modBtnCanc );
      /*/
    if (this.add) {
      this.service.create(this.form.value).subscribe(
        () => {
          this.modal.showAllertSuccess('Curso Cirado com sucesso');
          // this.location.back(); to back to previouws pagge not very effective avoid to use
          this.router.navigate(['/']);

        },
        () => this.modal.showAllertDanger('Erro ao criar curso'),
        () => console.log('request OK')
      );
    }
    else if(this.edit)
    {
      this.service.update(this.form.value).subscribe(
        () => {
          this.modal.showAllertSuccess('Curso alterado com sucesso');
          // this.location.back(); to back to previouws pagge not very effective avoid to use
          this.router.navigate(['/']);

        },
        () => this.modal.showAllertDanger('Erro ao alterar curso'),
        () => console.log('update OK')

      )

    }
/*/


    } else {
      alert('formulario invalido');
    }
  }

  onOK() {
    this.router.navigate(['/']);
  }

  onCancel() {
    this.submited = false;
    if (this.edit || this.delete) {
      this.router.navigate(['/']);
    } else {
      this.form.reset();
    }
    //    alert('cancel');

  }

}
