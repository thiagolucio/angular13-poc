import { Directive, Input, OnInit, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective implements OnInit {

  @Input('appForIn')
  numbers: number[] = [];

  constructor (
    private container: ViewContainerRef,
    private template: TemplateRef<any>
    ) {

      console.log('ForDirective');

  }

  ngOnInit(): void {
    for(let number of this.numbers) {
      this.container.createEmbeddedView(this.template, {
        $implicit: number
      });
    }
    console.log('this.numbers');
  }
}
