import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketComponent } from "../ticket/ticket.component";

@Component({
  selector: 'app-reciept',
  standalone: true,
  imports: [TicketComponent],
  templateUrl: './reciept.component.html',
  styleUrl: './reciept.component.css'
})
export class RecieptComponent implements OnInit{
  id: string | null= "";

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
    }

}
