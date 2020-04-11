import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
//import { CursosComponent } from './cursos/cursos.component';
//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
import { AuthGuard } from './guards/auth-guard';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';




const app_Routes: Routes =[
    {path: 'cursos',
     loadChildren: 'app/cursos/cursos.module#CursosModule',
     canActivate:[AuthGuard],
     canActivateChild: [CursosGuard],
     canLoad: [AuthGuard] 
    },// what should be loadede first 
    
    {path: 'alunos',
     loadChildren: 'app/alunos/alunos.module#AlunosModule'
     ,canActivate:[AuthGuard],//,
     canLoad: [AuthGuard] 
//     canActivateChild: [AlunosGuard] 
     

    },// what should be loadede first 
    
    {path: 'login', component: LoginComponent},
    {path: '', component: HomeComponent,canActivate:[AuthGuard]},
    {path: '**', component: PaginaNaoEncontradaComponent },
    
    //,
    //{path: 'cursos', component: CursosComponent},
    //{path: 'naoEncontrado', component: CursoNaoEncontradoComponent},    
    //{path: 'curso/:id', component: CursoDetalheComponent}
    

     
] ;

@NgModule({
    imports: [RouterModule.forRoot(app_Routes, {useHash: true} )],
    exports:  [RouterModule]
})
export class AppRoutingModule {}