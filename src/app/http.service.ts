import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { ListClients } from "./list-clients";

@Injectable({
  providedIn: "root"
})
export class HttpService {

  private listClientsSubject = new BehaviorSubject<ListClients[]>(
    []
  );

  test = "send email";
  
  private data: any;

  setData(data: any){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

  get listClients$(): Observable<ListClients[]> {
    return this.listClientsSubject.asObservable();
  }

  setListClients(w: ListClients[]) {
    this.listClientsSubject.next(w);
  }
  constructor(private http: HttpClient) {}

  // getAllCriminalSessions(): Observable<ListClients[]> {
  //   return this.http
  //     .post<ListClients[]>('http://db/DetyreAPI/api/Client/getClient')
  //     .pipe(
  //       tap((listClients) =>
  //         this.setListClients(listClients)
  //       ),
  //       take(1)
  //     );
  // }

  httpGet(url: string) {
    return this.http.get(url);
  }

  httpPost(url: string, {}) {
    return this.http.post(url, { name: "Subrat" });
  }

  sendEmail(url: string, data: any) {
    return this.http.post(url, data);
  }

  addClient(url: string, data: any) {
    return this.http.post(url, data);
  }

  updateClient(url: string, data: any) {
    return this.http.put(url, data);
  }

  deleteClient(url: string, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
      body: data
    };
    this.http.delete(url, httpOptions).subscribe(data => {
      console.log('ia dole', data);
    });
  }

  login(url: string, data: any) {
    return this.http.post(url, data);
  }

}
