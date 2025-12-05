import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';   // ✅ FIXED import


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLoggedIn$!: Observable<boolean>;
  menuOpen = false;

  constructor(private authService: AuthService, private router: Router,    private toastr: ToastrService,
) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.authService.isLoggedIn$;
  }

  goBack() {
    window.history.back();
  }

  goForward() {
    window.history.forward();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastr.success('Logout successful');

  }
}
