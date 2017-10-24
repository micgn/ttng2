import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppModel} from './model';
import {AppService} from "./service";

@Component({
  selector: 'datepicker',
  template: `
    <div>
      <button (click)="today()">today</button>
    </div>
    <div>
      <button (click)="change(-7)">-7</button>
      <button (click)="change(-1)">-1</button>
      <input value="{{selectedDate | date:'EE dd.MM.yyyy'}}" placeholder="date..." readonly/>
      <button (click)="change(1)">+1</button>
      <button (click)="change(7)">+7</button>
    </div>
    <div>
      <button (click)="set()" class="actionBtn">set</button>
      <button (click)="cancel()" class="actionBtn">cancel</button>
    </div>
  `
})
export class DatePickerComponent {

  public selectedDate: Date;

  constructor(private model: AppModel, private router: Router, private service: AppService) {
    this.selectedDate = model.selectedDate;
  }

  change(n: number): void {
    this.selectedDate = new Date(this.selectedDate.getTime() + n * 24 * 60 * 60 * 1000);
  }

  today(): void {
    this.selectedDate = new Date();
  }

  set(): void {
    this.model.selectedDate = this.selectedDate;
    this.model.times = null;
    this.service.loadDayModel();
    this.router.navigateByUrl("day");
  }

  cancel(): void {
    this.router.navigateByUrl("day");
  }

}
