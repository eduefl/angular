import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

export enum ALERTTYPES  {
  DANGER = 'danger',
  SUCCESS = 'success'

}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private Showmsg(message: string, backdrop = true, ignoreBackdropClick = true, type: ALERTTYPES) {
    const config = {
      backdrop: backdrop,
      ignoreBackdropClick: ignoreBackdropClick
    }; // popup setting
    const bsmodalRef: BsModalRef = this.modalService.show(AlertModalComponent, config);
    bsmodalRef.content.type = type;
    bsmodalRef.content.message = message;


  }

  showAllertDanger(message: string, backdrop = true, ignoreBackdropClick = true ) {
    this.Showmsg(message, backdrop, ignoreBackdropClick , ALERTTYPES.DANGER);
  }
  showAllertSuccess(message: string, backdrop = true, ignoreBackdropClick = true ) {
    this.Showmsg(message, backdrop, ignoreBackdropClick , ALERTTYPES.SUCCESS);
  }


}
