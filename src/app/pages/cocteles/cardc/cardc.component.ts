import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardc.component.html',
  styleUrls: ['./cardc.component.css'],
})

export class CardListComponent implements OnChanges {
  @Input() items: any[] = [];
  @Output() cardClick = new EventEmitter<any>();

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
}
