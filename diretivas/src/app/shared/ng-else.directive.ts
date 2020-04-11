import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngElse]'
})
export class NgElseDirective {
  @Input() set ngElse(expressao: boolean) {
    if(!expressao){
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else{
      this._viewContainerRef.clear();
    }

    
  }
  constructor(
    private _templateRef: TemplateRef<any>, 
    private _viewContainerRef: ViewContainerRef
  ) { }

}
