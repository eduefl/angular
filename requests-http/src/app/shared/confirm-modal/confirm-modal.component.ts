import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() msg: string;
  @Input() btnOK =  'OK';
  @Input() btnCanc = 'Cancel';

  confirmResult: Subject<boolean>;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onClose() {
    this.confimrAndClose(false);
  }

  onConfirm() {
    this.confimrAndClose(true);
  }

  private confimrAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();

  }

}
