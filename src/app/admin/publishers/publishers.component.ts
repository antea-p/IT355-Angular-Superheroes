import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PublisherService } from 'src/app/services/publisher.service';
import { selectAllPublishers } from 'src/app/state/publishers/publisher.selectors';
import { Publisher } from 'src/app/model/publisher.model';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {
  publishers$ = this.store.select(selectAllPublishers);
  publisherForm: FormGroup;
  editMode: boolean = false;
  currentPublisherId: number | null = null;

  constructor(private store: Store, private publisherService: PublisherService, private fb: FormBuilder) {
    this.publisherForm = this.fb.group({
      publisherName: ['', [Validators.required, Validators.pattern('\\S+.*')]] // Osigurava da string ne sadrzava leading whitespaces
    });
  }

  ngOnInit(): void {
    this.publisherService.getPublishers();
  }

  deletePublisher(id: number): void {
    this.publisherService.deletePublisher(id);
  }

  submitForm(): void {
    if (this.publisherForm.invalid) {
      console.log('Form validation error!');
      return;
    }

    const { publisherName } = this.publisherForm.value;
    if (this.editMode && this.currentPublisherId !== null) {
      this.updatePublisher({ id: this.currentPublisherId, publisherName });
    } else {
      this.createPublisher(publisherName);
    }

    this.resetForm();
  }

  createPublisher(publisherName: string): void {
    this.publisherService.createPublisher(publisherName);
  }

  updatePublisher(publisher: Publisher): void {
    this.publisherService.updatePublisher(publisher);
  }

  editPublisher(publisher: Publisher): void {
    this.editMode = true;
    this.currentPublisherId = publisher.id;
    this.publisherForm.setValue({ publisherName: publisher.publisherName });
  }

  resetForm(): void {
    this.publisherForm.reset();
    this.editMode = false;
    this.currentPublisherId = null;
  }
}
