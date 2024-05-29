import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SuperpowerService } from 'src/app/services/superpower.service';
import { selectAllSuperpowers } from 'src/app/state/superpowers/superpower.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Superpower } from 'src/app/model/superpower.model';

@Component({
  selector: 'app-superpowers',
  templateUrl: './superpowers.component.html',
  styleUrls: ['./superpowers.component.css']
})
export class SuperpowersComponent implements OnInit {
  superpowers$ = this.store.select(selectAllSuperpowers);
  superpowerForm: FormGroup;
  editMode: boolean = false;
  currentSuperpowerId: number | null = null;

  constructor(private store: Store, private superpowerService: SuperpowerService, private fb: FormBuilder) {
    this.superpowerForm = this.fb.group({
      powerName: ['', [Validators.required, Validators.pattern('\\S+.*')]]
    });
  }

  ngOnInit(): void {
    this.superpowerService.getSuperpowers();
  }

  deleteSuperpower(id: number): void {
    this.superpowerService.deleteSuperpower(id);
  }

  submitForm(): void {
    if (this.superpowerForm.invalid) {
      console.log('Form validation error!');
      return;
    }

    const { powerName } = this.superpowerForm.value;
    console.log('Form values:', this.superpowerForm.value);
    if (this.editMode && this.currentSuperpowerId !== null) {
      this.updateSuperpower({ id: this.currentSuperpowerId, powerName });
    } else {
      this.createSuperpower(powerName);
    }

    this.resetForm();
  }

  createSuperpower(powerName: string): void {
    this.superpowerService.createSuperpower(powerName);
  }

  updateSuperpower(superpower: Superpower): void {
    this.superpowerService.updateSuperpower(superpower);
  }

  editSuperpower(superpower: Superpower): void {
    this.editMode = true;
    this.currentSuperpowerId = superpower.id;
    this.superpowerForm.setValue({ powerName: superpower.powerName });
  }

  resetForm(): void {
    this.superpowerForm.reset();
    this.editMode = false;
    this.currentSuperpowerId = null;
  }
}
