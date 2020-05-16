import { SharedModule } from './../shared/shared.module';
// import { HttpModule } from '@angular/http'; // used before V6
import { TemplateFormComponent } from './template-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   // HttpModule,  // used before V6
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    TemplateFormComponent,
  ]
})
export class TemplateFormModule { }
