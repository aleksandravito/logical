import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { OnChanges } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ClientService } from "../services/client.service";

@Component({
  selector: 'app-login-confirm',
  templateUrl: './login-confirm.component.html',
  styleUrls: ['./login-confirm.component.css']
})
export class LoginConfirmComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;

  codeFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(5)
  ]);

  constructor(
     public http: HttpService, 
    private _router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public client: ClientService
  ) { }

  ngOnInit(): void {
    this.checkEmail();
    this.form = this.formBuilder.group({
      code: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }

  checkEmail() {

    let data = this.http.getData();
    this.http.sendEmail('http://db/DetyreAPI/api/Client/sendEmail', data ).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `sukses!`
        );
      },
      err => {
        console.log('nuk mundi te dergohej', err);
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

    let codeClient: any = this.form.value.code;
    let codeClientLS = localStorage.getItem('kodi');
    if ( codeClient === codeClientLS ) 
      this._router.navigateByUrl('/list-clients');
    }

}
