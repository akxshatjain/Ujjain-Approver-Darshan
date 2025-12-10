import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApproverService } from '../services/approver.service';

@Component({
  selector: 'app-update-approver-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-approver-profile.component.html',
  styleUrls: ['./update-approver-profile.component.css']
})
export class UpdateApproverProfileComponent implements OnInit {
  profileData: any = null;
  name = '';
  gender = '';
  dob = '';
  address = '';
  aadhar = '';

  loading = false;
  submitted = false;

  constructor(private approverService: ApproverService, private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.approverService.getSelfProfile().subscribe({
      next: (res) => {
        this.profileData = res?.message?.profile || null;
        if (this.profileData) {
          this.name = this.profileData.approver_name || '';
          this.gender = this.profileData.gender || '';
          this.dob = this.profileData.dob || '';
          this.address = this.profileData.address || '';
          this.aadhar = this.profileData.aadhar || '';
        }
      },
      error: (err) => {
        console.error('Error fetching profile details:', err);
      }
    });
  }

  handleSubmit() {
    this.loading = true;
    const info = {
      approver_name: this.name.trim(),
      gender: this.gender,
      dob: this.dob,
      address: this.address.trim(),
      aadhar: this.aadhar.trim(),
    };

    this.approverService.updateProfile(info).subscribe({
      next: (res) => {
        console.log('Profile updated successfully:', res);
        this.loading = false;
        this.submitted = true;
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.loading = false;
      },
    });
  }


  resetForm(): void {
    if (this.profileData) {
      this.name = this.profileData.approver_name || '';
      this.gender = this.profileData.gender || '';
      this.dob = this.profileData.dob || '';
      this.address = this.profileData.address || '';
      this.aadhar = this.profileData.aadhar || '';
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
