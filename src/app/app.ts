import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PokemonListComponent],
  template: `
    <main>
      <app-pokemon-list></app-pokemon-list>
    </main>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      main {
        min-height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Teste Pokémon Rede Dor';
}
