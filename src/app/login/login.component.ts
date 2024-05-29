import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/admin']);
      } else {
        this.loginFailed = true;
      }
    });
  }
}