import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { PageErrorComponent } from './page-error/page-error.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [AlertModalComponent, PageErrorComponent, ConfirmModalComponent],
  exports: [AlertModalComponent, PageErrorComponent],
  entryComponents: [AlertModalComponent, ConfirmModalComponent]

})
export class SharedModule { }
