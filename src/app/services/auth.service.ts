import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Reactive login status
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  // Check localStorage for login
private hasToken() {
  return !!sessionStorage.getItem('authToken');
}


  // ✅ Called after successful login
login(token: string) {
  sessionStorage.setItem('authToken', token);
  this.loggedIn.next(true);
}


  // ❌ Called on logout
logout() {
  sessionStorage.removeItem("authToken");
  this.loggedIn.next(false);
}


  // For AuthGuard
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
}
