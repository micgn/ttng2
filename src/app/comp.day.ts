import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppModel} from './model';
import {AppService} from './service';
import {MessageComponent} from "./comp.message";

@Component({
  selector: 'day',
  template: `
    <div>
      <input (click)="selectDate()" value="{{model.selectedDate | date:'EE dd.MM.yyyy'}}" placeholder="date..."
             class="date actionInput" readonly/>
      <button (click)="load()" class="actionBtn">load</button>
    </div>
    <table>
      <tr *ngFor="let item of model.times; let index = index">
        <td><input (click)="editTime(index, 'from')" placeholder="from..." value="{{item.from}}"
                   class="time actionInput" readonly/></td>
        <td><input (click)="editTime(index, 'to')" placeholder="to..." value="{{item.to}}" class="time actionInput"
                   readonly/></td>
        <td><input (click)="editCategories(index)" placeholder="category..." value="{{item.cats}}" readonly
                   class="cat actionInput"></td>
        <td>
          <button (click)="remove(index)">rm</button>
        </td>
      </tr>
      <tr [hidden]="loaded()">
        <td align="right"><label>total:</label></td>
        <td>{{model.getTotalHours()}} h</td>
        <td></td>
        <td>
          <button (click)="add()">add</button>
        </td>
      </tr>
      <tr [hidden]="loaded()">
        <td align="right"><label>week:</label></td>
        <td>{{model.getWeekMinutesStr()}}</td>
      </tr>
    </table>
    <div>
      <button (click)="save()" [disabled]="canNotBeSaved()" class="actionBtn">save</button>
    </div>
    <message-box></message-box>
  `
})
export class DayComponent {

  constructor(public model: AppModel, private service: AppService,
              private router: Router, private messageComponent: MessageComponent) {
  }

  selectDate(): void {
    this.router.navigateByUrl("date");
  }

  load(): void {
    this.service.loadDayModel();
  }

  editTime(index: number, type: string): void {
    this.model.selectedIndex = index;
    this.model.selectedType = type;
    this.router.navigateByUrl("time");
  }

  editCategories(index: number): void {
    this.model.selectedIndex = index;
    this.router.navigateByUrl("cats");
  }

  add(): void {
    this.model.addEntry();
  }

  remove(index: number): void {
    this.model.times.splice(index, 1);
  }

  loaded(): boolean {
    return this.model.loadedDate != this.model.selectedDate;
  }

  save(): void {
    this.service.saveDayModel();
  }

  canNotBeSaved(): boolean {
    return !this.model.isValid();
  }
}
