import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class HomeComponent implements OnInit{
  isAuthinticated: boolean = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.authService.isAuthinticated().subscribe(
        {
          next: res => {this.isAuthinticated = res;}, 
          error: err => console.log(err)
        }
      )
  }

}
