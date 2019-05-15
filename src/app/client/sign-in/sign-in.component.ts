import { AlertService } from './../../_services/alert.service';
import { first } from 'rxjs/operators';
import { AuthenticationService, Credentials } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  model: Credentials = {
    email: '',
    password: '',
  };
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.authenticationService.login(this.model)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          this.alertService.error(error.error);
          this.loading = false;
        });
  }
}
