import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiURLBase: string = 'https://pokeapi.co/api/v2/pokemon/';
  private next:string | null = null;
  private previous: string | null = null;

  constructor(
    private http:HttpClient
  ) { }

  getPokemons(url:string = this.apiURLBase): Observable<Pokemons>{
    return this.http.get<Pokemons>(url);
  }

  getpokemon(termino: string | number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.apiURLBase}${termino}`);
  }

  set nextURL(url:string | null){
    this.next = url;
  }

  set previousURL(url:string | null){
    this.previous = url;
  }

  get nextURL(): string | null{
    return this.next;
  }

  get previousURL(): string | null{
    return this.previous;
  }
}
