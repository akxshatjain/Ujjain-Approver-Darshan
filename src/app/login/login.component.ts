import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApproverService } from '../services/approver.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';   // ✅ FIXED import


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  phone: string = '';
  password: string = 'Mpsedc123';
  loading = false;

  constructor(
    private toastr: ToastrService,
    private approverService: ApproverService,
    private authService: AuthService,
    private router: Router
  ) {}

async onLogin(event: Event) {
  event.preventDefault();
  this.loading = true;

  try {
    const response = await this.approverService.getAuthToken(this.phone);

    if (response?.message?.token) {
      localStorage.setItem("authToken", response.message.token);
      this.authService.login(response.message.token);

      this.toastr.success('Login successful');
      this.router.navigate(['/dashboard']);
    } else {
      alert("Invalid login");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  } finally {
    this.loading = false;
  }
}

}
