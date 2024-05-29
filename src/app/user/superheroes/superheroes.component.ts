import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SuperheroService } from 'src/app/services/superhero.service';
import { selectAllSuperheroes } from 'src/app/state/superheroes/superhero.selectors';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.css']
})
export class SuperheroesComponent implements OnInit {

  superheroes$ = this.store.select(selectAllSuperheroes);

  constructor(private store: Store, private superheroService: SuperheroService) { }

  ngOnInit(): void {
    this.superheroService.getSuperheroes();
  }
}