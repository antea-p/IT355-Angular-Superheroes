import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthState } from '../state/auth/auth.reducer';
import * as AuthActions from '../state/auth/auth.actions';
import * as AuthSelectors from '../state/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth/check';
  private loginUrl = 'http://localhost:8080/auth/login';
  private logoutUrl = 'http://localhost:8080/auth/logout';

  constructor(private http: HttpClient, private store: Store<AuthState>) {
    this.checkLoginStatus();
  }

  private checkLoginStatus(): void {
    this.http.get<{ authenticated: boolean }>(this.authUrl).pipe(
      map(response => 
        response.authenticated),
      tap(isLoggedIn => this.store.dispatch(AuthActions.setIsLoggedIn({ isLoggedIn }))),
      catchError(() => of(false))
    ).subscribe();
  }

  isLoggedIn(): Observable<boolean | undefined> {
    return this.store.select(AuthSelectors.selectIsLoggedIn);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      map(response => response.message === "Login successful"),
      tap(success => {
        if (success) {
          this.store.dispatch(AuthActions.setIsLoggedIn({ isLoggedIn: true }));
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }

  logout(): Observable<boolean> {
    return this.http.post<any>(this.logoutUrl, {}).pipe(
      map(response => 
        response.message === "Logout successful"),
      tap(success => {
        if (success) {
          this.store.dispatch(AuthActions.setIsLoggedIn({ isLoggedIn: false }));
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return of(false);
      })
    );
  }
}
