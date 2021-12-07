import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ListClients } from '../list-clients';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})

export class ListClientsComponent implements OnInit {
  
  listClient = new Array<ListClients>();
  dtOptions: any = {};
  displayTable: boolean = false;
  status = "";
  errorMessage = "";
  contextMenuPosition = { x: '0px', y: '0px' };
  
  constructor(public http: HttpService, public listClients: HttpService) {
    
   }

  ngOnInit(): void {
    let clientsList = {
      "pageIndex": 1
    }
    
    this.http.sendEmail('http://db/DetyreAPI/api/Client/getClient', clientsList ).subscribe({
      next: (data) => {
        let res:any = data; 
        this.listClient = res;
        this.dtOptions = res;
        this.displayTable = true;
      },
      error: error => {
        console.error('nuk mundi te dergohej', error);
      }
    });
  }

  

  editRow(row: Array<ListClients> | any) {
    let clientsList = {
      "Id": row.Id,
      "FirstName": row.FirstName,
      "LastName": row.LastName,
      "BirthDate": row.BirthDate,
      "Address": row.Address,
      "Tel": row.Tel,
      "Latitude": row.Latitude,
      "Longitude": row.Longitude
    }
    if (row.Id === 0) {
      this.http.addClient('http://db/DetyreAPI/api/Client/AddClient', row).subscribe(res => {
        row.FirstName = 'test';
      });
    } else {
      this.http.updateClient('http://db/DetyreAPI/api/Client/UpdateClient', clientsList).subscribe();
    }
  }

  deleteRow(row: Array<ListClients> | any) {
      let client = {
        "Id": row.Id
      }
      this.http.deleteClient('http://db/DetyreAPI/api/Client/DeleteClient', client);
  }

}
