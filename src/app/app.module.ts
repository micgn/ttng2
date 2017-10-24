import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {routing} from './routing';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppModel} from './model';
import {AppService} from './service';

import {DayComponent} from './comp.day';
import {TimeComponent} from './comp.time';
import {DatePickerComponent} from "./comp.datepicker";
import {CategoriesComponent} from "./comp.categories";
import {MessageComponent} from "./comp.message";
import {DummyBackend} from "./dummy-backend";
import {WindowRef} from "./windowref";
import {DatePipe} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    TimeComponent,
    DatePickerComponent,
    CategoriesComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    JsonpModule
  ],
  providers: [AppModel, AppService, MessageComponent, DummyBackend, WindowRef, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
