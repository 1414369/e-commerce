import { first } from 'rxjs/operators';
import { AuthenticationService, Credentials } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
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
          this.toastr.success('Sign in successful');
          this.router.navigate(['']);
        },
        error => {
          this.toastr.error(error.error);
          this.loading = false;
        });
  }
}
