import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { TicketViewModel } from '../models/ticket/ticket-view-model.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit{
  @Input() id: string | null= "";
  ticket: TicketViewModel | null = null;
  
  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.userService.GetReciept((Number)(this.id)).subscribe({
      next: (res: TicketViewModel) => {
        this.ticket = res;
        console.log(res);
      },
      error: err => 
      {
        console.log(`Error getting ticket with id: ${this.id}, ${err}`);
      }
    })
  }

}
