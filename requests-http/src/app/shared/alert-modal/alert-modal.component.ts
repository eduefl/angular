import { Component, OnInit, Input } from '@angular/core';
import {  BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() type = 'success';
  @Input() message: string;
  @Input() img = 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/512/alert-icon.png';
  @Input() title = 'Look-out';




  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
