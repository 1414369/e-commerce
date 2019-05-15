import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigate = false;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigate) {
          // only keep for a single location change
          this.keepAfterNavigate = false;
        } else {
          // clear messages
          this.subject.next();
        }
      }
    })
  }

  success(message: string, keepAfterNavigate = false) {
    this.keepAfterNavigate = keepAfterNavigate;
    this.subject.next({ type: 'success', text: message })
  }

  error(message: string, keepAfterNavigate = false) {
    this.keepAfterNavigate = keepAfterNavigate;
    this.subject.next({ type: 'error', text: message })
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
