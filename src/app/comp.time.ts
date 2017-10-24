import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppModel} from './model';

@Component({
  selector: 'time-select',
  template: `
    <div>
      <input [(ngModel)]="time" placeholder="{{model.selectedType}}..." class="time" readonly/>
    </div>
    <div class="numberBtns">
      <button class="numberBtn" *ngFor="let n of [1,2,3]" [disabled]="!enabled(n)" (click)="number(n)">{{n}}</button>
      <br>
      <button class="numberBtn" *ngFor="let n of [4,5,6]" [disabled]="!enabled(n)" (click)="number(n)">{{n}}</button>
      <br>
      <button class="numberBtn" *ngFor="let n of [7,8,9]" [disabled]="!enabled(n)" (click)="number(n)">{{n}}</button>
      <br>
      <button class="numberBtn" *ngFor="let n of [0]" [disabled]="!enabled(n)" (click)="number(n)">{{n}}</button>
      <button (click)="clear()">X</button>
    </div>
    <div>
      <button (click)="ok()" [disabled]="notReady()" class="actionBtn">ok</button>
      <button (click)="cancel()" class="actionBtn">cancel</button>
    </div>
  `
})
export class TimeComponent {

  public time = "";

  constructor(public model: AppModel, private router: Router) {
    // better have empty field for usability
    // this.time = model.times[model.selectedIndex][model.selectedType];
  }

  enabled(n: number): boolean {
    let l = this.time.length;
    if (l === 0)
      return n <= 2;
    if (l === 1)
      return this.time !== "2" || (n >= 0 && n <= 3);
    else if (l === 3)
      return n >= 0 && n <= 5;
    else if (l >= 5)
      return false;
    else
      return true;
  }

  notReady(): boolean {
    return this.time.length < 5;
  }

  number(n: number): void {
    this.time += n + "";
    let l = this.time.length;
    if (l === 2)
      this.time += ":";
  }

  clear(): void {
    this.time = "";
  }

  ok(): void {
    let m = this.model;
    m.times[m.selectedIndex][m.selectedType] = this.time;
    if (m.selectedType === "from" && m.times[m.selectedIndex]["to"] === "") {
      m.times[m.selectedIndex]["to"] = this.time;
    }
    this.router.navigateByUrl("day");
  }

  cancel(): void {
    this.router.navigateByUrl("day");
  }
}
