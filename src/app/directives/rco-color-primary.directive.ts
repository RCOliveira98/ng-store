import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRcoColorPrimary]'
})
export class RcoColorPrimaryDirective {

  constructor(private elRef: ElementRef) {
    elRef.nativeElement.style.color = '#e35e6b';
   }

}
