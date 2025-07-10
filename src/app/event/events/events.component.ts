import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventViewModel } from '../../models/Event/event-view-model.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import { EventFilter } from '../../models/Event/event-filter.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule, LoadingSpinnerComponent, RouterLink, MatIconModule, MatMenuModule, MatButtonModule, MatSelectModule, MatExpansionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{

  isLoading = false;
  filteredEvents: EventViewModel[] = [];
  events: EventViewModel[] = [];
  filterOptions:EventFilter = new EventFilter();
  filterGroup = new FormGroup({
    name: new FormControl(""),
    location: new FormControl(""),
    performer: new FormControl(""),
    dateStart: new FormControl<Date|null>(null),
    dateEnd: new FormControl<Date|null>(null)
  })
  
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute)
  {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  navigateToDetails(event: EventViewModel): void {

    this.router.navigate(['event/details', event.event_id]);
  }

  applyFilters() {
    const filterOptions:EventFilter = this.filterGroup.value as EventFilter;

    // Navigate with query parameters
    this.router.navigate(['/events'], { queryParams: filterOptions }).then(() => this.loadEvents());
  }

  clearFilters() {
    const filterOptions:EventFilter = new EventFilter();

    // Navigate with query parameters
    this.router.navigate(['/events'], { queryParams: filterOptions }).then(() => this.loadEvents());
  }

  private sliceEvents(events: EventViewModel[]): EventViewModel[][]
  {
    const slicedEvents: EventViewModel[][] = [];
    for(let i = 0; i < events.length; i += 2)
    {
      slicedEvents.push(events.slice(i, i + 2));
    }
    return slicedEvents;
  }

  private filterEvents(events: EventViewModel[]): EventViewModel[] {
    this.filteredEvents = events.filter(event => {
      const matchesName = this.filterOptions.name? event.name.toLowerCase().includes(this.filterOptions.name.toLowerCase()) : true;
      const matchesPerformer = this.filterOptions.performer 
      ? event.event_Performers.some(eventPerformer =>
          eventPerformer.perfomer.performer_name
            .toLowerCase()
            .includes(this.filterOptions.performer.toLowerCase())
        )
      : true;

      const matchesLocation = this.filterOptions.location? event.location.toLowerCase().includes(this.filterOptions.location.toLowerCase()) : true;

      const startDate = this.filterOptions.dateStart?  new Date(this.filterOptions.dateStart) : new Date('24 Dec 1990 00:00:00');
      const endDate = this.filterOptions.dateEnd? new Date(this.filterOptions.dateEnd) : new Date('24 Dec 2990 00:00:00');
      const matchesDate = startDate.getTime() <= new Date(event.event_date).getTime() && new Date(event.event_date).getTime() <= endDate.getTime();
      return matchesName && matchesPerformer && matchesLocation && matchesDate;
    })

    console.log("Filtered Events: ", this.filteredEvents);
    return this.filteredEvents;
  }

  private loadEvents() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe(
      {
        next:( res: EventViewModel[]) =>
        {
         this.events = res;
         const filteredEvents = this.filterEvents(res);
         this.isLoading = false;
        },
        error: err => {
          console.log("Error getting events: ");
          console.log(err);
          this.isLoading = false;
        }
      }
    )

    this.route.queryParams.subscribe(params=> {
      this.filterOptions = { ...params } as EventFilter; // Copy query parameters into filterOptions
    });
  }
  
}
