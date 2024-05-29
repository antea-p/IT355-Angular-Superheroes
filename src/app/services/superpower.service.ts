import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Superpower } from 'src/app/model/superpower.model';
import { Store } from '@ngrx/store';
import { setSuperpowers, createSuperpower, updateSuperpower, deleteSuperpower } from 'src/app/state/superpowers/superpower.actions';

@Injectable({
  providedIn: 'root'
})
export class SuperpowerService {

  private apiUrl = 'http://localhost:8080/superpower';

  constructor(private http: HttpClient, private store: Store) { }

  getSuperpowers(): void {
    this.http.get<Superpower[]>(this.apiUrl)
      .subscribe(superpowers => this.store.dispatch(setSuperpowers({ superpowers })));
  }

  createSuperpower(powerName: string): void {
    const newSuperpower = { id: 0, powerName };
    this.http.post<Superpower>(this.apiUrl, newSuperpower)
      .subscribe(superpower => {
        this.store.dispatch(createSuperpower({ superpower }));
      });
  }

  updateSuperpower(superpower: Superpower): void {
    this.http.put<Superpower>(`${this.apiUrl}`, superpower)
      .subscribe(updatedSuperpower => this.store.dispatch(updateSuperpower({ superpower: updatedSuperpower })));
  }

  deleteSuperpower(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => this.store.dispatch(deleteSuperpower({ id })));
  }
}
