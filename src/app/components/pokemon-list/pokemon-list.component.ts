import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PokemonCardComponent,
    PokemonDetailComponent,
    PaginationComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  allPokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  currentPagePokemon: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;

  searchTerm: string = '';
  selectedType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 20;
  loading: boolean = true;

  pokemonTypes: string[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonTypes = this.pokemonService.getAllTypes();
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonService.getPokemonList().subscribe({
      next: (pokemon) => {
        this.allPokemon = pokemon;
        this.filterPokemon();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar Pokémon:', error);
        this.loading = false;
      },
    });
  }

  filterPokemon(): void {
    let filtered = [...this.allPokemon];

    if (this.searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedType) {
      filtered = filtered.filter((p) => p.types.some((t) => t.type.name === this.selectedType));
    }

    this.filteredPokemon = filtered;
    this.currentPage = 1;
    this.updateCurrentPage();
  }

  updateCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPagePokemon = this.filteredPokemon.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateCurrentPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPokemonSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

  onCloseDetail(): void {
    this.selectedPokemon = null;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPokemon.length / this.itemsPerPage);
  }
}
