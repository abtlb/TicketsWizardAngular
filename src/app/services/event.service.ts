import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventViewModel } from '../models/Event/event-view-model.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEvents()
  {
    const requestStr = `${this.url}/Event/Events`;
    return this.http.get<EventViewModel[]>(requestStr);
  }

  getEvent(id: number)
  {
    return this.http.get<EventViewModel>(`${this.url}/Event/${id}`);
  }
}
