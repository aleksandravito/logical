import { Component, OnInit, OnChanges } from "@angular/core";
import { HttpService } from '../http.service'; 
import { FormControl, Validators } from "@angular/forms";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientService } from "../services/client.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  
  form!: FormGroup;
  loading = false;
  submitted = false;
  buttionText = "Logohu";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);


  constructor(
    public http: HttpService, 
    private _router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public client: ClientService ) {}

  ngOnInit() {
    console.log(this.http.test);
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }

  // provoje me vone 
  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let randomNumber: Number = Math.floor(Math.random()*90000) + 10000;
    let user = {
      "Code": randomNumber,
      "Email": this.emailFormControl.value
    }
    console.log('mail body', user);
    this.http.sendEmail('http://db/DetyreAPI/api/Client/sendEmail', user ).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `sukses!`
        );
        this._router.navigateByUrl('/list-clients');
      },
      err => {
        console.log('nuk mundi te dergohej', err);
        this.loading = false;
        this.buttionText = "Logohu";
      },() => {
        this.loading = false;
        this.buttionText = "Logohu";
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;

    let loginClient: any = {
      "Username": this.form.value.username,
      "Password": this.form.value.password
    }
    let clientUsername = JSON.parse(localStorage.getItem('user') || '{}')['Username'];
    this.client.login('http://db/DetyreAPI/api/Client/CheckUser', loginClient)
        .pipe(first())
        .subscribe(
          data => {
          let res:any = data; 
          if( res.Username === clientUsername )
            {
              let randomNumber: Number = Math.floor(Math.random()*90000) + 10000;
              let user = {
                "Code": randomNumber,
                "Email": res.Email
              }
              localStorage.setItem('kodi', JSON.stringify(randomNumber));
              this.http.setData(user);
              this._router.navigateByUrl('/confirm');
            }
          else 
            this._router.navigateByUrl('/login');
        },
        err => {
          console.log('nuk mundi te dergohej', err);
          this.loading = false;
        },() => {
          this.loading = false;
        });
    }

}
