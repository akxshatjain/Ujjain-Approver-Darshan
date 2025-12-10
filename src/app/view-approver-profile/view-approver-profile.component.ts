import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApproverService } from '../services/approver.service';
@Component({
  selector: 'app-view-approver-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-approver-profile.component.html',
  styleUrls: ['./view-approver-profile.component.css'],
})
export class ViewApproverProfileComponent implements OnInit {
  profile: any = null;
  error: string | null = null;
  loading = true;

  constructor(private approverService: ApproverService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.approverService.getSelfProfile().subscribe({
      next: (res) => {
        this.profile = res?.message?.profile || null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
        this.error = 'Failed to load profile';
        this.loading = false;
      },
    });
  }

  truthyInt(value: any): boolean {
    return Number(value) === 1;
  }

  updateProfile() {
    this.router.navigate(['/updateprofile']);
  }
}
