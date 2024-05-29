import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLoggedIn: Observable<boolean | undefined>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.isLoggedIn.subscribe(isLoggedIn => {
      console.log('isLoggedIn state:', isLoggedIn);
    });
  }

  logout(): void {
    this.authService.logout().subscribe(success => {
      if (success) {
        console.log('Logout successful, reloading page...');
        //window.location.reload();
      } else {
        console.log('Logout failed.');
      }
    });
  }
}
