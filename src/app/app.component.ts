import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import * as luxon from 'luxon'; //and attach the luxon variable to Window object using window.luxon = luxon

@Component({
    selector: 'app-root',
    imports: [CalendarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  /**Isto é um Dummer de dados vindo do server */
  meetings = {
    '2024-12-25': ['Dring Coffee', 'Learn Angular', 'Sleep'],
    '2024-12-26': ['Dring Coffee', 'Learn Java', 'Sleep'],
    '2024-12-15': ['Dring Coffee', 'Learn View', 'Sleep'],
  };

  constructor() {
    window.luxon = luxon; //fazendo o luxon ser conhecido no DON e no console.
    console.group(
      luxon.DateTime.now().toFormat('yyyy-MM-dd'),
      luxon.DateTime.local(),
      luxon.DateTime.local().day.toPrecision(),
      
      luxon.DateTime.local(),
      luxon.DateTime.local().startOf('month').toString(),
      luxon.Info.weekdays(),
      luxon.Info.weekdays('short')
    );
  }
}
