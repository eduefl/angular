import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFileRoutingModule } from './upload-file-routing.module';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  imports: [
    CommonModule,
    UploadFileRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UploadFileComponent]
})
export class UploadFileModule { }
