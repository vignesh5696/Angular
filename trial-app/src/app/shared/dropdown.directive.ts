import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef : ElementRef) { }
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click',['$event']) toggleDropdown(event : Event){
    this.isOpen= this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;

  }

}
