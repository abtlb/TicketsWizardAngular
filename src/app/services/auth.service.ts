import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { map, catchError, Observable, firstValueFrom, of, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  url = environment.apiBaseUrl;
  private authState = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: SsrCookieService) { }

  login(username: string, password: string, isAdmin: boolean)
  {
    const loginInput = {username, password, isAdmin};
    return this.http.post(`${this.url}/Account/Login`, loginInput);
  }



  register(username: string, password: string, firstName: string, lastName: string, dateOfBirth: Date, phoneNumber: string)
  {
    let dobString = dateOfBirth.toISOString();
    const registerInput = {username: username, password: password, first_name: firstName, last_name: lastName, dateOfBirth: dobString, phone_number: phoneNumber};
    return this.http.post(`${this.url}/Account/Register`, registerInput);
  }

  setToken(token: string)
  {
    this.cookieService.set('token', token);
  }

  getToken()
  {
    return this.cookieService.get('token');
  }

  logout()
  {
    this.cookieService.delete('token');
    this.updateAuthintication();
  }

  getRole()
  {
    return this.http.get(`${this.url}/Account/Role`);
  }

  isAuthinticated(): Observable<boolean>{
    return this.authState.asObservable();
  }

  updateAuthintication(): void {
    this.http.get<{ message: string }>(`${this.url}/Account/Role`).pipe(
      map(res => res.message === 'Admin' || res.message === 'User'),
      catchError(() => of(false))
    ).subscribe(
      {
        next: res => {
          this.authState.next(res);
        },
        error: err => {
          console.log('Error checking authenctication', err);
        }
      }
    )
  }

  getCurrent()
  {
    return this.http.get<{firstName: string, lastName:string, username:string }>(`${this.url}/Account/Current`);
  }
}
