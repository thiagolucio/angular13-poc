import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorDelete]'
})
export class ColorDeleteDirective {

  constructor (private el: ElementRef) {
    el.nativeElement.style.backgroundColor = '#E91E63';
  }
}
