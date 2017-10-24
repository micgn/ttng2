import {Component} from '@angular/core';
import {AppModel} from './model';
import {Observable} from "rxjs";

@Component({
  selector: 'message-box',
  template: `
    <div class="msgbox" [hidden]="disabled()">
      {{model.message}}
    </div>
  `
})
export class MessageComponent {

  constructor(public model: AppModel) {
  }

  show(message: string): void {
    this.model.message = message;
    let timer = Observable.timer(2000);
    timer.subscribe(t => {
      this.remove();
    });

  }

  remove(): void {
    this.model.message = "";
  }

  disabled(): boolean {
    return this.model.message == null || this.model.message.length === 0;
  }

}
