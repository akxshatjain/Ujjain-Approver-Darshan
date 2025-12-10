import { Component, OnInit } from '@angular/core';
import { ApproverService } from '../services/approver.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  bookings: any[] = [];
  loading = false;
  error = '';
  selectedBooking: any = null;
  companions: any[] = [];
  showJsonModal = false;
  jsonData = '';

  darshanOrder = [
    { key: 'Vip Darshan', title: 'VIP Darshan' },
    { key: 'Bhasm Arti', title: 'Bhasm Arti' },
    { key: 'Shigra Darshan', title: 'Shigra Darshan' },
    { key: 'Localide Darshan', title: 'Localide Darshan' },
  ];

  constructor(private approverService: ApproverService) {}

  ngOnInit(): void {
    this.refresh();
  }

  /** 🔄 Refresh dashboard data */
  refresh(): void {
    this.loadStats();
    this.loadBookings();
  }

  /** 📊 Load appointment stats (card data) */
  loadStats(): void {
    this.loading = true;
    this.approverService.getAppointmentStats().subscribe({
      next: (res) => {
        this.stats = res.message || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load stats', err);
        this.error = 'Unable to load stats.';
        this.loading = false;
      },
    });
  }

  /** 📋 Load list of appointments (table data) */
  loadBookings(): void {
    this.loading = true;
    this.approverService.getAppointmentList(0, 20).subscribe({
      next: (res) => {
        this.bookings = res.message || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load bookings', err);
        this.error = 'Unable to load bookings.';
        this.loading = false;
      },
    });
  }

  /** 🔍 Open modal (future use for detail view) */
openModal(booking: any): void {
  this.selectedBooking = null;
  this.companions = [];

  console.log('Fetching full details for:', booking.name);

  this.approverService.getAppointment(booking.name).subscribe({
    next: (res) => {
      const details = res.message || res;
      console.log('Full details received:', details);

      this.selectedBooking = details;
      this.companions = details?.darshan_companion || [];
      document.body.classList.add('modal-open');
    },
    error: (err) => {
      console.error('Failed to load appointment details', err);
    },
  });
}

  /** ✅ Approve booking */
  approveSingle(appointment_id: string): void {
    this.approverService.approveAppointment(appointment_id).subscribe({
      next: (res) => {
        console.log('Approved:', res);
        this.loadBookings();
        this.loadStats();
      },
      error: (err) => console.error('Failed to approve', err),
    });
  }

  /** ❌ Reject booking */
  rejectSingle(appointment_id: string): void {
    this.approverService.rejectAppointment(appointment_id).subscribe({
      next: (res) => {
        console.log('Rejected:', res);
        this.loadBookings();
        this.loadStats();
      },
      error: (err) => console.error('Failed to reject', err),
    });
  }

  /** 🧮 Get total counts per darshan type */
getTotal(record: any): number {
  if (!record) return 0;
  return (Object.values(record) as number[]).reduce(
    (a, b) => a + (b || 0),
    0
  );
}



// ... existing methods like getTotal() ...

closeModal(): void {
  this.selectedBooking = null;
  this.companions = [];
  document.body.classList.remove('modal-open');
}



/** 📋 Copies the raw JSON data to the clipboard */
copyJson(): void {
  if (this.selectedBooking) {
    const jsonString = JSON.stringify(this.selectedBooking, null, 2);
    
    // Use the Clipboard API for modern browsers
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonString).then(() => {
        alert('JSON copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Failed to copy JSON. See console for details.');
      });
    } else {
      // Fallback for older browsers (less reliable)
      const el = document.createElement('textarea');
      el.value = jsonString;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('JSON copied to clipboard (using fallback)!');
    }
  }
}

closeJsonModal(): void {
  this.showJsonModal = false;
}
showJson(): void {
  if (this.selectedBooking) {
    this.jsonData = JSON.stringify(this.selectedBooking, null, 2);
    this.showJsonModal = true;
  }
}



}
