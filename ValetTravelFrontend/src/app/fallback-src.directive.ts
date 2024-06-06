import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appFallbackSrc]',
  standalone: true
})
export class FallbackSrcDirective {
  @Input() appFallbackSrc: string | undefined;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    console.log("directiva")
    const element: HTMLImageElement = this.el.nativeElement;
    element.src = this.appFallbackSrc || 'assets/images/default_img.png';
  }

}
