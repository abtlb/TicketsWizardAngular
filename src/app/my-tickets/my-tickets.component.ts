import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { UserService } from '../services/user.service';
import { TicketViewModel } from '../models/ticket/ticket-view-model.model';
import { catchError, forkJoin, of } from 'rxjs';
import { TicketComponent } from "../ticket/ticket.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [MatListModule, MatExpansionModule, TicketComponent, CommonModule],
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent implements OnInit{
  constructor(private userService: UserService){}
  ticketIds: string[] | undefined
  // tickets: TicketViewModel[] | undefined


  ngOnInit(): void {
    this.userService.GetHistory().subscribe({
      next: res => {
        this.ticketIds = res.map(id => String(id));
        // this.convertIdsToTickets();
      }
    })
  }

  // convertIdsToTickets(): void {
  //   if(this.ticketIds == undefined)
  //   {
  //     console.warn('No ticket IDs provided');
  //   }

  //   const requests = this.ticketIds!.map(id => this.userService.GetReciept(id).pipe(catchError(() => of(null))));
  //   forkJoin(requests).subscribe({
  //     next: res => 
  //     {
  //       this.tickets = res.filter(ticket => ticket !== null);
  //       console.log("Tickets: ", this.tickets.map(t => t.ticket_id));
  //     },
  //     error: err =>
  //     {
  //       console.error('Error fetching tickets:', err)
  //     }
  //   })

  //   this.ticketIds?.forEach(id => {
  //     this.userService.GetReciept(id).subscribe({
  //       next: res => {
  //         this.tickets?.push(res);
  //       }
  //     })
  //   })
  // }
}
