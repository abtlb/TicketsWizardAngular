import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventViewModel } from '../../models/Event/event-view-model.model';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { MatButtonModule} from '@angular/material/button'
import { trigger, state, style, animate, transition, AnimationEvent } from '@angular/animations';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';

@Component({
  selector: 'app-details',
  animations: [
    trigger('openClose', 
    [
      state('open',
        style({
          opacity: 1
        })
      ),
      state('closed',
        style({
          opacity: 0
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
  standalone: true,
  imports: [CommonModule, MatButtonModule, LoadingSpinnerComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  id: string | null= "";
  event: EventViewModel | null = null;
  isOpen: boolean[] = [];
  isLoading = false;
  
  constructor(private route: ActivatedRoute, private eventService: EventService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.eventService.getEvent((Number)(this.id)).subscribe({
      next: (res: EventViewModel) => {
        this.event = res;
        res.event_Tickets.forEach(ticket => {
          this.isOpen.push(false);
        });
        this.isLoading = false;
      }, 
      error: err => 
      {
        console.log(`Error getting event with id: ${this.id}, ${err}`);
        this.isLoading = false;
      }
    })
  }

  onBuy(eventId: number, ticketType: string)
  {
    this.userService.BuyTicket(eventId, ticketType).subscribe(
      {
        next: res => {
          this.router.navigate(['reciept', res.id]);
        }, 
        error: err => {
          console.log(err);
        }
      }
    )
  }

  usureOpen(i: number)
  {
    for(let j = 0; j < this.isOpen.length; j++)
    {
      if(j == i)
      {
        this.isOpen[j] = true;
      }
      else
      {
        this.isOpen[j] = false;
      }
    }
  }
}
