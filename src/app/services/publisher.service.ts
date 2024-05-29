import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publisher } from '../model/publisher.model';
import { Store } from '@ngrx/store';
import { createPublisher, deletePublisher, setPublishers, updatePublisher } from '../state/publishers/publisher.actions';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private apiUrl = 'http://localhost:8080/publisher';

  constructor(private http: HttpClient, private store: Store) { }

  getPublishers(): void {
    this.http.get<Publisher[]>(this.apiUrl)
      .subscribe(publishers => this.store.dispatch(setPublishers({ publishers })));
  }

  deletePublisher(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => this.store.dispatch(deletePublisher({ id })));
  }

  createPublisher(publisherName: string): void {
    const newPublisher = { id: 0, publisherName }; // Backend dodjeljuje ID
    this.http.post<Publisher>(this.apiUrl, newPublisher)
      .subscribe(publisher => this.store.dispatch(createPublisher({ publisher })));
  }

  updatePublisher(publisher: Publisher): void {
    this.http.put<Publisher>(`${this.apiUrl}`, publisher)
      .subscribe(updatedPublisher => this.store.dispatch(updatePublisher({ publisher: updatedPublisher })));
  }
}
