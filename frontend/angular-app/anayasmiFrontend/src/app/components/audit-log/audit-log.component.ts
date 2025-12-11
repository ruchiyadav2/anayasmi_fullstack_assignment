import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditService } from '../../services/audit.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {

  logs: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs() {
    this.loading = true;
    this.auditService.getAuditLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load audit logs';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
