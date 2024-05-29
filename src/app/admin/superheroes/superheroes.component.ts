import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SuperheroService } from 'src/app/services/superhero.service';
import { selectAllSuperheroes } from 'src/app/state/superheroes/superhero.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Superhero } from 'src/app/model/superhero.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.css']
})
export class SuperheroesComponent implements OnInit {
  superheroes$ = this.store.select(selectAllSuperheroes);
  superheroForm: FormGroup;
  editMode: boolean = false;
  currentSuperheroId: number | null = null;

  constructor(private store: Store, private superheroService: SuperheroService, private fb: FormBuilder) {
    this.superheroForm = this.fb.group({
      superheroName: ['', [Validators.required, Validators.pattern('\\S+.*')]],
      fullName: ['', [Validators.required, Validators.pattern('\\S+.*')]],
      heightCm: [0, [Validators.required, Validators.min(0)]],
      weightKG: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.superheroService.getSuperheroes();
  }

  deleteSuperhero(id: number): void {
    this.superheroService.deleteSuperhero(id);
  }

  submitForm(): void {
    if (this.superheroForm.invalid) {
      console.log('Form validation error!');
      return;
    }

    const { superheroName, fullName, heightCm, weightKG } = this.superheroForm.value;
    const updatedSuperhero = { id: this.currentSuperheroId ?? 0, superheroName, fullName, heightCm, weightKG };

    if (this.editMode && this.currentSuperheroId !== null) {
      this.superheroes$.subscribe(superheroes => {
        const currentSuperhero = superheroes.find(sh => sh.id === this.currentSuperheroId);
        if (currentSuperhero) {
          const mergedSuperhero = { ...currentSuperhero, ...updatedSuperhero };
          this.superheroService.updateSuperhero(mergedSuperhero);
        }
      });
    } else {
      this.superheroService.createSuperhero(updatedSuperhero);
    }

    this.resetForm();
  }

  createSuperhero(superhero: Superhero): void {
    this.superheroService.createSuperhero(superhero);
  }

  updateSuperhero(superhero: Superhero): void {
    this.superheroService.updateSuperhero(superhero);
  }

  editSuperhero(superhero: Superhero): void {
    this.editMode = true;
    this.currentSuperheroId = superhero.id;
    this.superheroForm.setValue({
      superheroName: superhero.superheroName || '',
      fullName: superhero.fullName || '',
      heightCm: superhero.heightCm || 0,
      weightKG: superhero.weightKG || 0
    });
  }

  resetForm(): void {
    this.superheroForm.reset();
    this.editMode = false;
    this.currentSuperheroId = null;
  }
}
