import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApproverService {

  
  // ✅ Store IP in one variable
  private API_IP = 'http://10.120.10.245:8890';

  // ✅ Base URL auto-built using IP
  private baseUrl =
    `${this.API_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_approver_profile.darshan_approver_profile.`;

  constructor(private http: HttpClient) { }

  // ✅ Helper: Always attach Authorization header
  private getAuthHeaders() {
    return {
      headers: {
        "Authorization": sessionStorage.getItem("authToken") || ""
      }
    };
  } 

  // ✅ LOGIN
  async loginVerify(phone: string, pwd: string): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.post(
          `${this.API_IP}/api/method/login`,
          { usr: phone, pwd: pwd },
          this.getAuthHeaders()
        )
      );
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  }

  // ✅ DASHBOARD APIs
  getAppointmentStats(): Observable<any> {
    return this.http.post(
      this.baseUrl + 'get_appointment_stats',
      {},
      this.getAuthHeaders()
    );
  }

  getAppointmentList(limitStart: number, pageLength: number): Observable<any> {
    return this.http.post(
      this.baseUrl + 'get_appointment_list',
      {
        limitStart,
        pageLength
      },
      this.getAuthHeaders()
    );
  }

  getAppointment(appointment_id: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'get_appointment',
      { appointment_id },
      this.getAuthHeaders()
    );
  }

  approveAppointment(appointment_id: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'approve_appointment',
      { appointment_id },
      this.getAuthHeaders()
    );
  }

  rejectAppointment(appointment_id: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'reject_appointment',
      { appointment_id },
      this.getAuthHeaders()
    );
  }

  // ✅ SELF PROFILE
  getSelfProfile(): Observable<any> {
    return this.http.get(
      `${this.API_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_approver_profile.darshan_approver_profile.get_self_profile`,
      this.getAuthHeaders()
    );
  }

  updateProfile(info: any): Observable<any> {
    return this.http.post(
      `${this.API_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_approver_profile.darshan_approver_profile.update_profile`,
      { info },
      this.getAuthHeaders()
    );
  }

  // ✅ GET AUTH TOKEN
  async getAuthToken(phone: string): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.post(
          `${this.API_IP}/api/method/mahakaal.darshan_booking.doctype.session_login.session_login.get_auth_token`,
          { phone: phone + '' }
        )
      );
    } catch (error) {
      console.error("Token login failed", error);
      return null;
    }
  }
// ✅ REGISTER APPROVER
async registerApprover(phone: number): Promise<any> {
  try {
    return await firstValueFrom(
      this.http.post(
        `${this.API_IP}/api/method/mahakaal.darshan_booking.doctype.darshan_approver_profile.darshan_approver_profile.create_approver`,
        { phone },
        this.getAuthHeaders()
      )
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
}


}
