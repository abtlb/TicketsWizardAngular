import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventViewModel } from '../models/Event/event-view-model.model';
import { environment } from '../../environments/environment.development';
import { TicketViewModel } from '../models/ticket/ticket-view-model.model';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  BuyTicket(eventId: number, ticketType: string)
  {
    return this.http.post<{id: number}>(`${this.url}/User/BuyTicket/${eventId}/${ticketType}`, {});
  }

  GetReciept(ticketId: number)
  {
    let params = new HttpParams().set("id", ticketId);
    return this.http.get<TicketViewModel>(`${this.url}/User/GetReciept`, {params});
  }

  GetHistory()//ticket ids
  {
    return this.http.get<[number]>(`${this.url}/User/GetHistory`);
  }
}
