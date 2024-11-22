import { Component, OnInit } from '@angular/core';
import { FraganciaService, Fragancia } from '../../../services/fragancia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-my-api',
  templateUrl: './list-my-api.component.html',
  styleUrls: ['./list-my-api.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListMyApiComponent implements OnInit {
  fragancias: Fragancia[] = [];
  isLoading = false;
  noResults = false;
  searchTerm = '';
  selectedFragancia: Fragancia | null = null;

  // Paginación
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;

  constructor(private fraganciaService: FraganciaService) {}

  ngOnInit(): void {
    this.loadFragancias();
  }

  get paginatedFragancias(): Fragancia[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.fragancias.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.fragancias.length / this.itemsPerPage);
  }

  loadFragancias(): void {
    this.isLoading = true;
    this.fraganciaService.getFragancias().subscribe({
      next: (response) => {
        this.fragancias = Array.isArray(response.datos) ? response.datos : [response.datos];
        this.totalItems = this.fragancias.length;
        this.noResults = this.fragancias.length === 0;
        this.currentPage = 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading fragancias:', err);
        this.isLoading = false;
        this.noResults = true;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.loadFragancias();
      return;
    }

    this.isLoading = true;
    this.fraganciaService.searchFragancias(this.searchTerm).subscribe({
      next: (response) => {
        this.fragancias = Array.isArray(response.datos) ? response.datos : [response.datos];
        this.totalItems = this.fragancias.length;
        this.noResults = this.fragancias.length === 0;
        this.currentPage = 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching fragancias:', err);
        this.isLoading = false;
        this.noResults = true;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadFragancias();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openDetailsModal(fragancia: Fragancia): void {
    this.selectedFragancia = fragancia;
  }
}