import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Superhero } from '../model/superhero.model';
import { Store } from '@ngrx/store';
import { setSuperheroes, createSuperhero, updateSuperhero, deleteSuperhero } from 'src/app/state/superheroes/superhero.actions';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private apiUrl = 'http://localhost:8080/superhero';

  constructor(private http: HttpClient, private store: Store) { }

  getSuperheroes(): void {
    this.http.get<Superhero[]>(this.apiUrl)
      .subscribe(superheroes => this.store.dispatch(setSuperheroes({ superheroes })));
  }

  createSuperhero(superhero: Superhero): void {
    const newSuperhero = {
      ...superhero, gender: { id: 1, gender: "Male" },
      eyeColour: { id: 9, colour: "Brown" },
      hairColour: { id: 13, colour: "Grey" },
      skinColour: { id: 1, colour: "No Colour" },
      race: { id: 1, race: "-" },
      publisher: { id: 13, publisherName: "Marvel Comics" },
      alignment: { id: 1, alignment: "Good" }, powers: []
    };
    this.http.post<Superhero>(this.apiUrl, newSuperhero)
      .subscribe(superhero => this.store.dispatch(createSuperhero({ superhero })));
  }

  updateSuperhero(superhero: Superhero): void {
    this.http.put<Superhero>(`${this.apiUrl}`, superhero)
      .subscribe(updatedSuperhero => this.store.dispatch(updateSuperhero({ superhero: updatedSuperhero })));
  }

  deleteSuperhero(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => this.store.dispatch(deleteSuperhero({ id })));
  }
}
