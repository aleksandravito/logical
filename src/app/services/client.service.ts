import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientSubject: BehaviorSubject<Client>;
  public client: Observable<Client>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.clientSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('user')!));
    this.client = this.clientSubject.asObservable();
  }

  public get clientValue(): Client {
    return this.clientSubject.value;
}

login(url: string, data: string) {
  // if (clientUsername === data['Username'] ) {
    return this.http.post<Client>(url, data)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user_logged_in', JSON.stringify(user));
            this.clientSubject.next(user);
            return user;
        }));
  }
//   return;
// }

logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    // this.clientSubject.next(null);
    this.router.navigate(['/account/login']);
}

}
