import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private apiUrl = 'http://localhost:5002/audit-log';

  constructor(private http: HttpClient) { }

  getAuditLogs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
