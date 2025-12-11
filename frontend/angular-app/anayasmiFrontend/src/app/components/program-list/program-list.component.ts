import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

  programs: any[] = [];

  constructor(private programService: ProgramService, private router: Router) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programService.getPrograms().subscribe(data => {
      this.programs = data;
    });
  }

  editProgram(id: string) {
    this.router.navigate(['/add-program'], { queryParams: { id: id } });
  }

  deleteProgram(id: string) {
    if (confirm('Are you sure you want to delete this program?')) {
      this.programService.deleteProgram(id).subscribe(() => this.loadPrograms());
    }
  }

  // Helper method to get participant names safely
  getParticipantNames(program: any): string {
    if (!program.participants || program.participants.length === 0) {
      return 'No participants';
    }
    return program.participants.map((p: any) => p.name).join(', ');
  }
}
