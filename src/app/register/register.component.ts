import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {}

  // Getter for easy access to form controls
  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.isLoading = true;
    if (this.registerForm.errors != null) {
      console.log("Form is invalid: ");
      return;
    }
    const { username, password, firstName, lastName, dateOfBirth, phoneNumber } = this.registerForm.value;
    this.authService.register(username, password, firstName, lastName, new Date(dateOfBirth), phoneNumber)
      .subscribe({
        next: () => {

          this.snackBar.open('Registration successful! Please login.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
          this.isLoading = false;
        }
      });
  }
}