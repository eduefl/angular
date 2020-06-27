import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

export enum ALERTTYPES {
  DANGER = 'danger',
  SUCCESS = 'success',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  private defalutcErrorImg =
    'https://cdn4.iconfinder.com/data/icons/miscellaneous-icons-2-1/200/misc_shit-512.png';
  private defalutcSuccesImg =
    'https://seeklogo.com/images/F/facebook-like-beer-icon-logo-085B2FDDC2-seeklogo.com.png';

  constructor(private modalService: BsModalService) {}

  private Showmsg(
    message: string,
    backdrop = true,
    ignoreBackdropClick = true,
    type: ALERTTYPES,
    dissmisstimeOut?: number,
    img = null,
    title = null
  ) {
    const config = {
      backdrop: backdrop,
      ignoreBackdropClick: ignoreBackdropClick,
    }; // popup setting
    const bsmodalRef: BsModalRef = this.modalService.show(
      AlertModalComponent,
      config
    );
    bsmodalRef.content.type = type;
    bsmodalRef.content.message = message;
    if (img) {
      bsmodalRef.content.img = img;
    }
    if (title) {
      bsmodalRef.content.title = title;
    }

    if (dissmisstimeOut) {
      setTimeout(() => bsmodalRef.hide(), dissmisstimeOut);
    }
  }
  showConfirm(    message = 'Posso perguntar',
    // img = this.defalutcErrorImg,
    title = 'Esta certo Disso ?',
    oktxt= 'Sim Silvio',
    canctxt= 'Vou pular silvio Silvio',
    backdrop = true,
    ignoreBackdropClick = true,
    ) {
      const config = {
        backdrop: backdrop,
        ignoreBackdropClick: ignoreBackdropClick,
      }; // popup setting

      const bsmodalRef: BsModalRef = this.modalService.show(ConfirmModalComponent, config);
      const oModal = <ConfirmModalComponent>bsmodalRef.content;
      oModal.title = title;
      oModal.msg = message;
      oModal.btnOK = oktxt;
      oModal.btnCanc = canctxt;
      // bsmodalRef.content.title = title;
      // bsmodalRef.content.msg = message;
      // bsmodalRef.content.btnOK = oktxt;
      // bsmodalRef.content.btnCanc = canctxt;

      return oModal.confirmResult ;


  }

  showAllertDanger(
    message: string,
    backdrop = true,
    ignoreBackdropClick = true,
    img = this.defalutcErrorImg,
    title = 'Holy guacamole'
  ) {
    this.Showmsg(
      message,
      backdrop,
      ignoreBackdropClick,
      ALERTTYPES.DANGER,
      null,
      img,
      title
    );
  }
  showAllertSuccess(
    message: string,
    backdrop = true,
    ignoreBackdropClick = true,
    img = this.defalutcSuccesImg,
    title = 'That`s science Beach'
  ) {
    this.Showmsg(
      message,
      backdrop,
      ignoreBackdropClick,
      ALERTTYPES.SUCCESS,
      3000,
      img,
      title
    );
  }
}
