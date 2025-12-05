import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApproverService } from '../services/approver.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  phone: string = '';
  loading: boolean = false;

  constructor(
    private approverService: ApproverService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async onRegister() {
    this.loading = true;

    const res = await this.approverService.registerApprover(Number(this.phone));

    if (res?.message) {
      this.toastr.success("Registered successfully");
      this.router.navigate(['/login']);
    } else {
      this.toastr.error(res || "Registration failed");
    }

    this.loading = false;
  }
}
