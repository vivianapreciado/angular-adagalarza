import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal/modal.component';
import { Character } from '../services/dbz.service';

@Component({
  selector: 'dbz-cardz',
  standalone: true,
  imports: [CommonModule,ModalComponent],
  templateUrl: './cardz.component.html',
  styleUrls: ['./cardz.component.css'],
})
export class CardListComponent implements OnChanges {
  @Input() items: any[] = [];
  @Output() cardClick = new EventEmitter<any>();
  @ViewChild(ModalComponent) public modal!: ModalComponent

  // Mapa para rastrear el estado de carga de cada imagen
  loadingStates: Map<string, boolean> = new Map();

  ngOnChanges(changes: SimpleChanges) {
    // Cuando los items cambian, inicializamos el estado de carga para cada imagen
    if (changes['items'] && changes['items'].currentValue) {
      this.items.forEach(item => {
        if (item.image && !this.loadingStates.has(item.image)) {
          this.loadingStates.set(item.image, true);
        }
      });
    }
  }

  truncateText(text: string, limit: number = 100): string {
    return text?.length > limit ? text.substring(0, limit) + '...' : text;
  }

  onCardClick(item: any) {
    this.cardClick.emit(item);
  }

  onImageError(event: any, imageUrl: string) {
    event.target.src = 'assets/placeholder.png';
    this.loadingStates.set(imageUrl, false);
  }

  onImageLoad(imageUrl: string) {
    this.loadingStates.set(imageUrl, false);
  }

  isLoading(imageUrl: string): boolean {
    return this.loadingStates.get(imageUrl) ?? true;
  }

  openModal(selectedCharacterr: Character): void{
    if(this.modal){
    this.modal.open(selectedCharacterr);
    }
  }
}