import { FormValidations } from './../form-validations';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  //  @Input() mostrarErro: boolean;
  //  @Input() msgErro: string;

  @Input() control: FormControl;
  @Input() label: string;
  @Input() noNeedTouch = false;
  @Input() custMessag: string;
  @Input() lSubmit: string;





  constructor() { }

  ngOnInit() {

  }

  get errorMessage() {
    // console.log(this.label);
    // console.log(this.noNeedTouch);


    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
         (this.control.touched || this.noNeedTouch || this.lSubmit )) {
          // to do
         //  console.log(this.control.errors[propertyName]);
          if (this.custMessag != null && this.custMessag !== '') {
            return this.custMessag;
          } else {
            return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
          }
        }
    }
    return null;
  }

}
