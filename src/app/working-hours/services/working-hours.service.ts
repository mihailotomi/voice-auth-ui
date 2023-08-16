import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkingHours } from '../models/working-hours';
import { environment } from 'src/environments/environment';
import { JwtService } from 'src/app/auth/services/jwt.service';

@Injectable({ providedIn: 'root' })
export class WorkingHoursService {
  endpoint = environment.endpoint;

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getMyCurrent() {
    const token = this.jwtService.token();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<WorkingHours>(
      `${this.endpoint}/working-hours/me/current`,
      {
        headers,
      }
    );
  }
}
