import { Component } from '@angular/core';

let client = {
  "Username": "a.vito",
  "Password": "1"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  animal: string = "";
  name: string = "";
  
  constructor() {
    localStorage.setItem('user', JSON.stringify(client));
  }

}
