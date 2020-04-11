import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosService } from './cursos/cursos.service';
import { CriarCusrsoModule } from './criar-curso/criar-curso.module';
import { LogService } from './shared/log.service';



@NgModule({
  declarations: [
    AppComponent,
    CursosComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CriarCusrsoModule
  ],
  providers: [LogService],
  //providers: [CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
