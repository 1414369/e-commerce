import { first } from 'rxjs/operators';
import { AuthenticationService, Credentials } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authenticationService.login(this.model)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Sign in successful');

          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          this.router.navigate([returnUrl]);
        });
  }
}
