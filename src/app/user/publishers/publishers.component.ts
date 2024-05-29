import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPublishers } from '../../state/publishers/publisher.selectors';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {

  publishers$ = this.store.select(selectAllPublishers);

  constructor(private store: Store, private publisherService: PublisherService) {}

  ngOnInit(): void {
    this.publisherService.getPublishers();
  }
}