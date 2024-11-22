import { Component, OnInit } from '@angular/core';
import { FraganciaService, Fragancia, ApiResponse } from '../../../services/fragancia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-my-api',
  templateUrl: './create-my-api.component.html',
  styleUrls: ['./create-my-api.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CreateMyApiComponent implements OnInit {
  fragancia: Fragancia = {
    nombre: '',
    marca: '',
    precio: 0,
    descripcion: '',
    stock: 0,
    imagen: ''
  };
  
  fragancias: Fragancia[] = [];
  filteredFragancias: Fragancia[] = [];
  searchTerm: string = '';
  message: string = '';
  success: boolean = false;
  isEditing: boolean = false;
  showModal: boolean = false;
  modalTitle: string = '';

  constructor(private fraganciaService: FraganciaService) {}

  ngOnInit() {
    this.loadFragancias();
  }

  searchFragancias() {
    if (!this.searchTerm) {
      this.filteredFragancias = this.fragancias;
    } else {
      this.filteredFragancias = this.fragancias.filter(fragancia => 
        fragancia.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        fragancia.marca.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  loadFragancias() {
    this.fraganciaService.getFragancias().subscribe(
      (response: ApiResponse) => {
        if (response.exito) {
          this.fragancias = Array.isArray(response.datos) ? response.datos : [response.datos];
          this.filteredFragancias = [...this.fragancias];
        } else {
          this.message = response.error || 'Error al cargar fragancias';
          this.success = false;
        }
      },
      error => {
        this.message = 'Error al cargar fragancias: ' + error.message;
        this.success = false;
      }
    );
  }

  openModal(editing: boolean = false, fragancia?: Fragancia) {
    this.isEditing = editing;
    this.modalTitle = editing ? 'Editar Fragancia' : 'Crear Nueva Fragancia';
    
    if (editing && fragancia) {
      this.fragancia = { ...fragancia };
    } else {
      this.resetForm();
    }
    
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  onSubmit() {
    if (this.isEditing && this.fragancia._id) {
      this.fraganciaService.updateFragancia(this.fragancia._id, this.fragancia).subscribe(
        (response: ApiResponse) => {
          this.success = response.exito;
          this.message = response.mensaje || (response.exito ? 'Fragancia actualizada exitosamente!' : 'Error al actualizar fragancia.');
          if (response.exito) {
            this.closeModal();
            this.loadFragancias();
          }
        },
        error => {
          this.success = false;
          this.message = 'Error al actualizar fragancia: ' + error.message;
        }
      );
    } else {
      this.fraganciaService.createFragancia(this.fragancia).subscribe(
        (response: ApiResponse) => {
          this.success = response.exito;
          this.message = response.mensaje || (response.exito ? 'Fragancia creada exitosamente!' : 'Error al crear fragancia.');
          if (response.exito) {
            this.closeModal();
            this.loadFragancias();
          }
        },
        error => {
          this.success = false;
          this.message = 'Error al crear fragancia: ' + error.message;
        }
      );
    }
  }

  deleteFragancia(id: string) {
    if (confirm('¿Está seguro de que desea eliminar esta fragancia?')) {
      this.fraganciaService.deleteFragancia(id).subscribe(
        (response: ApiResponse) => {
          this.success = response.exito;
          this.message = response.mensaje || (response.exito ? 'Fragancia eliminada exitosamente!' : 'Error al eliminar fragancia.');
          if (response.exito) {
            this.loadFragancias();
          }
        },
        error => {
          this.success = false;
          this.message = 'Error al eliminar fragancia: ' + error.message;
        }
      );
    }
  }

  resetForm() {
    this.fragancia = {
      nombre: '',
      marca: '',
      precio: 0,
      descripcion: '',
      stock: 0,
      imagen: ''
    };
    this.message = '';
    this.isEditing = false;
  }
}