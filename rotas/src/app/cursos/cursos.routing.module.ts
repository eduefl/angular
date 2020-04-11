import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
 
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';


import { CursosComponent } from './cursos.component';



const cursosRoutes: Routes =[

    {path: '', component: CursosComponent},
    {path: 'naoEncontrado', component: CursoNaoEncontradoComponent},    
    {path: ':id', component: CursoDetalheComponent}
    

     
] ;


@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(cursosRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class CursosRoutingModule {}