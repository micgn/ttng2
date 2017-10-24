import {AppModel, Time} from './model';
import {Injectable} from "@angular/core";


@Injectable()
export class DummyBackend {

  private db: Array<[String, Array<Time>]> = [];

  constructor(private model: AppModel) {
  }

  load(date: Date): void {
    let index = this.find(this.str(date));
    if (index !== -1) {
      this.model.times = this.db[index][1].slice();
    } else {
      this.model.times = [];
    }
    this.model.categories = ["development", "testing", "meeting"];
    this.model.weekMinutes = 42 * 60 + 10;
  }

  save(date: Date): void {
    let deleteIndex = this.find(this.str(date));
    if (deleteIndex !== -1) {
      this.db.splice(deleteIndex, 1);
    }

    // slice means cloning
    this.db.push([this.str(date), this.model.times.slice()]);
  }

  private find(date: string): number {
    let deleteIndex = -1;
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i][0] === date) {
        deleteIndex = i;
      }
    }
    return deleteIndex;
  }

  private str(date: Date): string {
    return date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
  }
}
