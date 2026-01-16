import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 151): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=${limit}`).pipe(
      switchMap((response) => {
        const requests = response.results.map((pokemon) => this.http.get<Pokemon>(pokemon.url));
        return forkJoin(requests);
      })
    );
  }

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`);
  }

  getAllTypes(): string[] {
    return [
      'normal',
      'fire',
      'water',
      'electric',
      'grass',
      'ice',
      'fighting',
      'poison',
      'ground',
      'flying',
      'psychic',
      'bug',
      'rock',
      'ghost',
      'dragon',
      'dark',
      'steel',
      'fairy',
    ];
  }
}
