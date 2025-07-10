import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    isAdmin: new FormControl(false)
  })
    isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

handleSubmit() {
  this.isLoading = true;
  //---handle invalid forms---
  this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!, this.loginForm.value.isAdmin!).subscribe({
    next: (res : any) => {
      this.authService.setToken(res.token);
       this.authService.updateAuthintication();
       this.router.navigate(['']);
      this.isLoading = false;
    },
    error: err => {
      console.log(`Error code: ${err.status}`);
      this.isLoading = false;
    }
  });
  }  
}
