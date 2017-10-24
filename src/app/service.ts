import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {AppModel, Time} from './model';

import {MessageComponent} from "./comp.message";
import 'rxjs/add/operator/toPromise';
import {environment} from "../environments/environment";
import {DummyBackend} from "./dummy-backend";
import {WindowRef} from "./windowref";
import {DatePipe} from "@angular/common";


@Injectable()
export class AppService {

  private host: String;

  constructor(private model: AppModel, private http: Http, private message: MessageComponent,
              private dummy: DummyBackend, private winRef: WindowRef, private datePipe: DatePipe) {
    this.model.selectedDate = new Date();
    this.host = winRef.nativeWindow.location.hostname;
  }

  private baseUrl(): String {
    return "https://" + this.host + ":" + environment.restPort + "/timetracker/rest/";
  }

  loadDayModel(): void {
    this.model.loadedDate = this.model.selectedDate;

    if (environment.offlineMode) {
      this.dummy.load(this.model.selectedDate);
      this.message.show("loaded");
      return;
    }

    const dateStr = this.datePipe.transform(this.model.loadedDate, "ddMMyyyy");

    const headers = new Headers();
    headers.append("Accept", "application/json");

    if (environment.auth != null) {
      headers.append("Authorization", "Basic " + environment.auth);
      // console.log(headers);
    }

    this.http
      .get(this.baseUrl() + dateStr, {headers: headers})
      .toPromise()
      .then(res => {
        let json = res.json();
        this.fillModel(json);
        this.message.show("loaded");
      })
      .catch(this.handleError);
  }

  saveDayModel(): void {

    if (environment.offlineMode) {
      this.dummy.save(this.model.loadedDate);
      this.message.show("saved");
      return;
    }

    const dateStr = this.datePipe.transform(this.model.selectedDate, "ddMMyyyy");

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");
    if (environment.auth != null) {
      headers.append("Authorization", "Basic " + environment.auth);
    }

    this.http
      .post(this.baseUrl() + dateStr, this.model2Json(), {headers: headers})
      .toPromise()
      .then(res => {
        let json = res.json();
        this.fillModel(json);
        this.message.show("saved");
      })
      .catch(this.handleError);

  }

  private fillModel(json: any): void {

    this.model.categories = json["availableCategories"];

    this.model.times = [];
    for (let activity of (json["activities"])) {
      let time = new Time();
      time.id = activity["id"];
      time.from = this.toTimeStr(activity["from"]);
      time.to = this.toTimeStr(activity["to"]);
      time.cats = activity["categories"];
      this.model.times.push(time);
    }
    this.model.weekMinutes = json["weekMinutes"];
  }

  private model2Json(): any {

    let activities: any = [];
    this.model.times.forEach(time => {

      const to = this.toTimeNumber(time.from);
      const from = this.toTimeNumber(time.to);
      const activity = {
        "id": time.id,
        "from": to,
        "to": from,
        "categories": time.cats
      };
      activities.push(activity);
    });

    let json: any = {
      "activities": activities,
      "availableCategories": this.model.categories
    };
    return json;
  }


  private toTimeStr(t: number): string {
    const d = new Date(0);
    d.setUTCMilliseconds(t);
    return this.datePipe.transform(d, "HH:mm");
  }

  private toTimeNumber(t: string): number {
    const hours = parseInt(t.substring(0, 2));
    const mins = parseInt(t.substring(3, 5));
    const d = this.model.loadedDate;
    d.setHours(hours, mins, 0, 0);
    return d.getTime();
  }


  private handleError(error: any): Promise<any> {
    alert("rest error: " + error);
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
