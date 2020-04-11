import { Directive, HostListener, HostBinding, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseOver(){
    /*/this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'background-color', 'yellow' );/*/
      this.backgroundColor = this.highLightColor;
  }



  @HostListener('mouseleave') onMouseLeave(){
    /*/this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'background-color', 'white' );/*/
      this.backgroundColor = this.defaultColor;
      
  }

  //  @HostBinding('style.backgroundColor') backgroundColor: string;

  @HostBinding('style.backgroundColor') get setColor(){

    return this.backgroundColor;

  } 
  
  @Input() defaultColor : string = 'white' ; 
  @Input()  highLightColor : string = 'yellow';
  @Input()  cor : string = 'yellow';
  
  private backgroundColor: string;
  

  constructor(
    /*/private _elementRef: ElementRef,
    private _renderer: Renderer/*/
  
  
  ) { }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.backgroundColor = this.defaultColor;
    
  }
}
