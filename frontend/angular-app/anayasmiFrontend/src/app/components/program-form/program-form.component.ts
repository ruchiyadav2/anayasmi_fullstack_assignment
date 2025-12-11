import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-program-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {

  id: string | null = null;
  programData: any = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0,
    file: ''   // add file property to show existing file
  };

  selectedFile: any;
  loading: boolean = false;

  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id) {
      this.programService.getProgramById(this.id).subscribe(data => {
        // Convert dates to YYYY-MM-DD for date input
        this.programData = {
          ...data,
          startDate: data.startDate ? data.startDate.split('T')[0] : '',
          endDate: data.endDate ? data.endDate.split('T')[0] : ''
        };
      });
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    this.loading = true;

    const formData = new FormData();
    formData.append('name', this.programData.name);
    formData.append('description', this.programData.description);
    formData.append('startDate', this.programData.startDate);
    formData.append('endDate', this.programData.endDate);
    formData.append('budget', this.programData.budget.toString());

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.id) {
      this.programService.updateProgram(this.id, formData).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, () => this.loading = false);
    } else {
      this.programService.addProgram(formData).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, () => this.loading = false);
    }
  }
}
