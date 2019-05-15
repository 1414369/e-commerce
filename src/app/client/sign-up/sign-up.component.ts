import { UserService, AlertService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model: any = {};
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;
    this.userService.register(this.model)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/sign-in']);
        },
        error => {
          this.alertService.error(error.error);
          this.loading = false;
        });
  }
}
