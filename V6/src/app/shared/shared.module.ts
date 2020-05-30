// import { HttpModule } from '@angular/http'; //used befor V6
import { DropdownService } from './services/dropdown.service';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { GenericMsgComponent } from './generic-msg/generic-msg.component';

@NgModule({
  imports: [
    CommonModule,
    // HttpModule //used befor V6

  ],
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    GenericMsgComponent
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    GenericMsgComponent
  ],
  providers: [DropdownService]

})
export class SharedModule { }
