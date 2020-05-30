import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generic-msg',
  templateUrl: './generic-msg.component.html',
  styleUrls: ['./generic-msg.component.css']
})
export class GenericMsgComponent implements OnInit {

  constructor() { }
  @Input() lShow: boolean;
  @Input() cMsg: string;
  @Input() cStatus = 'waiting';


  ngOnInit() {
  }
  confgDiv() {
    let cRet: string;

    if (this.cStatus === 'waiting') {
      cRet = 'alert alert-info';
    } else if (this.cStatus === 'ok') {
      cRet = 'alert alert-success';
    }
    return cRet;
  }

  confgSpan() {
    let cRet: string;
    if (this.cStatus === 'waiting') {
      cRet = 'glyphicon glyphicon-time';
    } else if (this.cStatus === 'ok') {
      cRet = 'glyphicon glyphicon-ok';
    }
    return cRet;
  }
}
