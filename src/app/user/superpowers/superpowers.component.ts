import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SuperpowerService } from 'src/app/services/superpower.service';
import { selectAllSuperpowers } from 'src/app/state/superpowers/superpower.selectors';

@Component({
  selector: 'app-superpowers',
  templateUrl: './superpowers.component.html',
  styleUrls: ['./superpowers.component.css']
})
export class SuperpowersComponent implements OnInit {

  superpowers$ = this.store.select(selectAllSuperpowers);

  constructor(private store: Store, private superpowerService: SuperpowerService) { }

  ngOnInit(): void {
    this.superpowerService.getSuperpowers();
  }
}