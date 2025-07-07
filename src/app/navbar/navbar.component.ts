import { Component, OnInit } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, MatMenuModule, MatIconModule, MatButtonModule, MatGridListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  isAuthinticated: boolean = false;
  currentUser: { firstName: string, lastName: string, username: string } | undefined;

  constructor(private authService: AuthService, private router: Router)
  {
    
  }

  ngOnInit(){
    this.authService.isAuthinticated().subscribe({
      next: res => {
        this.isAuthinticated = res;
        if(this.isAuthinticated)
        {
          this.authService.getCurrent().subscribe(
            {
              next: res => {
                this.currentUser = res;
                console.log(this.currentUser);
              }
            }
          )
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('')
  }
  
}
