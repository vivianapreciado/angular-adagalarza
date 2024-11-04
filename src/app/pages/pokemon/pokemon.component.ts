import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { Pokemons } from './interfaces/pokemons';
import { PokemonService } from './services/pokemon.service';
import { SearchComponent } from './search/search.component';


@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent] ,
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemons | undefined;

  constructor(
    private _srvPokemon: PokemonService
  ){}

  ngOnInit(): void {
    this._srvPokemon.getPokemons().subscribe(
      (pokemonsAll) => {
        pokemonsAll.results.forEach((pokemon) =>{
          this._srvPokemon.getpokemon(pokemon.name).subscribe((pokemonData)  => {
            pokemon.data = pokemonData;
            this._srvPokemon.nextURL = pokemonsAll.next;
            this._srvPokemon.previousURL = pokemonsAll.previous;
          });
        });
        this.pokemons = pokemonsAll;
      }
    );
  }

  setNewPokemon(pokemonsNews:Pokemons):void{
    this.pokemons = pokemonsNews;
  }

  searchPokemon(termino:string):void{
    if(termino){
      this._srvPokemon.getpokemon(termino).subscribe((pokemon) =>  {
      this.pokemons = {
        count: 1,
        next:'',
        previous: null,
        results: [
          {
            name: pokemon.name,
            url:'',
            data: pokemon
          }
        ]
      };
      this._srvPokemon.nextURL = null;
      this._srvPokemon.previousURL = null;
      });
    }else{
      this.ngOnInit();
    }
  }

}
