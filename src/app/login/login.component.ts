import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    isAdmin: new FormControl(false)
  })

  constructor(private authService: AuthService, private router: Router) {}

handleSubmit() {
  //---handle invalid forms---
  this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!, this.loginForm.value.isAdmin!).subscribe({
    next: (res : any) => {
      this.authService.setToken(res.token);

      // this.authService.getRole().subscribe(
      //   {
      //    next: (res: any) => {
      //      console.log(res.message);
      //    },
      //    error: err => {
      //      console.log(err);
      //    }
      //   }
      //  )
       this.authService.updateAuthintication();
       this.router.navigate(['']);
    },
    error: err => {
      console.log(`Error code: ${err.status}`);
    }
  });

  
  }  
}
