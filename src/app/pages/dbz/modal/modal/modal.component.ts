import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Character } from '../../services/dbz.service';


@Component({
  selector: 'character-modal',
  standalone: true,
  imports: [NgFor, TitleCasePipe, NgIf],
  templateUrl: './modal.component.html',
  styles: [],
})
export class ModalComponent {
  @Input() public selectedCharacter: Character | null = null; // Cambia a tu interfaz

  private bootstrapModal: any;
  @ViewChild('modalElement') public modalElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformid: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformid)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
    });
  }

  open(character: Character): void {
    this.selectedCharacter = character;
    if (isPlatformBrowser(this.platformid)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    this.selectedCharacter = null; // Reiniciar el personaje
    this.bootstrapModal.hide();
  }

}
