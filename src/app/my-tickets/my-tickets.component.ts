import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { UserService } from '../services/user.service';
import { TicketViewModel } from '../models/ticket/ticket-view-model.model';
import { catchError, forkJoin, of } from 'rxjs';
import { TicketComponent } from "../ticket/ticket.component";
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [MatListModule, MatExpansionModule, TicketComponent, CommonModule, LoadingSpinnerComponent],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent implements OnInit{
  constructor(private userService: UserService){}
  ticketIds: string[] | undefined
  isLoading = true;


  ngOnInit(): void {
    this.isLoading = true;
    this.userService.GetHistory().subscribe({
      next: res => {
        this.ticketIds = res.map(id => String(id));
        this.isLoading = false;
      }
    })
  }
}
