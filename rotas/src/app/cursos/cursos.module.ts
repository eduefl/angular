//import { RouterModule } from '@angular/router';
import { CursosService } from './cursos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosComponent } from './cursos.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosRoutingModule } from './cursos.routing.module';

@NgModule({
    declarations: [ CursosComponent,
                    CursoDetalheComponent,
                    CursoNaoEncontradoComponent        
     ],
    imports: [ CommonModule, 
        //RouterModule
        CursosRoutingModule
      ],
    exports: [],
    providers: [CursosService],
})
export class CursosModule {}