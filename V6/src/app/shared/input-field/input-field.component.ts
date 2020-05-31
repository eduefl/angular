import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => InputFieldComponent ),
  multi: true

};
@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements  ControlValueAccessor, OnInit {

  @Input() claseCss;
  @Input() id: string;
  @Input() label: string;
  @Input() type =  'text';
  @Input() place ;
  @Input() control;
  @Input() isReadOnly = false ;




  private innerValue: any;

  get value () {
    return this.innerValue;
  }

  set value (v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v ;
      this.onchangecb(v) ;
      // TOD0
    }
  }

  onchangecb: (_: any) => void = () => {};
  onctouchedcb: (_: any) => void = () => {};


  constructor() { }

  writeValue(v: any): void {
    this.value = v ;
  }
  registerOnChange(fn: any): void {
    this.onchangecb = fn ;
  }
  registerOnTouched(fn: any): void {
    this.onctouchedcb = fn ;

  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled ;
  }

  ngOnInit() {
    console.log(typeof(this.place));
    if (typeof(this.place) !== 'string') {
      this.place = (this.label);
    }

  }


}
