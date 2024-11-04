import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Pokemon } from '../interfaces/pokemons';

@Component({
  selector: 'pokemon-modal',
  standalone: true,
  imports: [NgFor, TitleCasePipe, NgIf],
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent {
@Input() public pokemon: Pokemon = {
  name: '',
  height: 0,
  weight: 0,
  sprites: {
    front_default: ''
  },
 } as Pokemon;

 private bootstrapModal: any;
 @ViewChild('modalElement') public modalElement!: ElementRef;

 constructor(@Inject(PLATFORM_ID) private platformId: Object){}

 ngAfterViewInit(): void {
  if(isPlatformBrowser(this.platformId)){
    this.initializeModal();
  }
 }

 initializeModal(): void {
  import('bootstrap').then((bootstrap) =>{
    this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement)
  })
 }

 open(pokemon: Pokemon):void{
  this.pokemon = pokemon;
  if(isPlatformBrowser(this.platformId)){
    if(this.bootstrapModal){
    this.bootstrapModal.show();
    }else{
      this.initializeModal();
      setTimeout(() => {
        this.bootstrapModal.show();
      }, 0)
    }
  }
 }

 close(): void{
  this.bootstrapModal.hide();
 }
}
