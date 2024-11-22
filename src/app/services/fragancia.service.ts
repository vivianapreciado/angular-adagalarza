import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Fragancia {
  _id?: string;
  nombre: string;
  marca: string;
  precio: number;
  descripcion?: string;
  stock?: number;
  imagen?: string;
}

export interface ApiResponse {
  exito: boolean;
  cantidad?: number;
  datos: Fragancia[] | Fragancia;
  mensaje?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FraganciaService {
  private apiUrl = 'http://localhost:4000/api/fragancias';

  constructor(private http: HttpClient) {}

  // Obtener todas las fragancias
  getFragancias(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        catchError(this.handleError<ApiResponse>('getFragancias'))
      );
  }

  // Buscar fragancias por nombre
  searchFragancias(nombre: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${encodeURIComponent(nombre)}`;
    return this.http.get<ApiResponse>(url)
      .pipe(
        catchError(this.handleError<ApiResponse>('searchFragancias'))
      );
  }

  // Crear una nueva fragancia
  createFragancia(fragancia: Fragancia): Observable<ApiResponse> {
    const { _id, ...fraganciaData } = fragancia;
  
    const safeFragancia = {
      ...fraganciaData,
      imagen: fragancia.imagen || '',
      stock: fragancia.stock || 0,
      descripcion: fragancia.descripcion || ''
    };
  
    return this.http.post<ApiResponse>(this.apiUrl, safeFragancia)
      .pipe(
        catchError(this.handleError<ApiResponse>('createFragancia'))
      );
  }

  // Actualizar una fragancia existente
  updateFragancia(id: string, fragancia: Fragancia): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ApiResponse>(url, fragancia)
      .pipe(
        catchError(this.handleError<ApiResponse>('updateFragancia'))
      );
  }

  // Eliminar una fragancia
  deleteFragancia(id: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse>(url)
      .pipe(
        catchError(this.handleError<ApiResponse>('deleteFragancia'))
      );
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of({ exito: false, datos: [] } as unknown as T);
    };
  }
}