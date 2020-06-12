import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { PageErrorComponent } from './page-error/page-error.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [AlertModalComponent, PageErrorComponent],
  exports: [AlertModalComponent, PageErrorComponent],
  entryComponents: [AlertModalComponent]

})
export class SharedModule { }
