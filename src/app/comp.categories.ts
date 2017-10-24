import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppModel} from './model';

@Component({
  selector: 'categories',
  template: `
    <label>categories:</label>
    <table>
      <tr *ngFor="let cat of model.categories">
        <td><input type="checkbox" [checked]="isChecked(cat)" (change)="change(cat)"/></td>
        <td>{{cat}}</td>
      </tr>
    </table>
    <div>
      <button (click)="set()" class="actionBtn">set</button>
      <button (click)="cancel()" class="actionBtn">cancel</button>
    </div>
  `
})
export class CategoriesComponent {

  private selectedCats: Array<string>;

  constructor(public model: AppModel, private router: Router) {
    this.selectedCats = model.getTimeRow().cats.slice();
  }

  isChecked(cat: string): boolean {
    return this.selectedCats.indexOf(cat) !== -1;
  }

  change(cat: string): void {
    if (this.selectedCats.indexOf(cat) === -1) {
      this.selectedCats.push(cat);
    } else {
      let index = this.selectedCats.indexOf(cat, 0);
      if (index > -1) {
        this.selectedCats.splice(index, 1);
      }
    }
  }


  set(): void {
    this.model.getTimeRow().cats = this.selectedCats;
    this.router.navigateByUrl("day");
  }

  cancel(): void {
    this.router.navigateByUrl("day");
  }

}
