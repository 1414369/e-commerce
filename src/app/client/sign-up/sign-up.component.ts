import { UserService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  model: any = {};
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
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
          this.toastr.success('Registration successful');
          this.router.navigate(['/sign-in']);
        },
        error => {
          this.toastr.error(error.error);
          this.loading = false;
        });
  }
}
