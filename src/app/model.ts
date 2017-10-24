export class AppModel {

  selectedDate: Date;
  loadedDate: Date;

  times: Array<Time>;
  categories: Array<string>;
  weekMinutes: number;

  selectedIndex: number;
  selectedType: string;

  message = "";

  getTimeRow(): Time {
    return this.times[this.selectedIndex];
  }

  addEntry(): void {
    let defaultCats: Array<string> = [];
    if (this.times.length > 0)
      defaultCats = this.times[0].cats;

    let time = new Time();
    time.cats = defaultCats;
    this.times.splice(this.times.length, 0, time);
  }

  isValid(): boolean {
    if (this.times == null)
      return false;
    for (let time of this.times)
      if (time.from.length === 0 || time.to.length === 0 || this.getTimeMins(time, "to") < this.getTimeMins(time, "from"))
        return false;
    return true;
  }

  private getTimeMins(time: Time, selector: string): number {
    const hours = parseInt(time[selector].substring(0, 2));
    const mins = parseInt(time[selector].substring(3, 5));
    return hours * 60 + mins;
  }

  getTotalHours(): number {
    let result = 0.0;
    if (this.times != null) for (let time of this.times) {
      if (time.from.length === 0 || time.to.length === 0)
        return 42;
      const diff = this.getTimeMins(time, "to") - this.getTimeMins(time, "from");
      if (diff <= 0) return 42;
      result = result + diff;
    }
    let amount = result / 60.0;
    let rounded = Math.round(amount * 100) / 100.0;
    return rounded;
  }

  getWeekMinutesStr(): string {
    if (this.weekMinutes == null)
      return "";
    return Math.floor(this.weekMinutes / 60) + "h " + (this.weekMinutes % 60) + "m";
  }
}


export class Time {
  id: number = null;
  from = "";
  to = "";
  cats: Array<string> = [];
}
