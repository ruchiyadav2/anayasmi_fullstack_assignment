import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  submit() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    this.loading = true;
   const userData = {
  username: this.username,
  email: this.email,
  password: this.password,
  confirmPassword: this.confirmPassword
};


    this.registerService.register(userData).subscribe(
      res => {
        this.loading = false;
        alert('Registration successful! You can now login.');
        this.router.navigate(['/login']); // redirect to login page
      },
      err => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    );
  }
}
