import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  /**Isto é um Dummer de dados vindo do server */
  meetings = {
    '2024-12-25':['Dring Coffee', 'Learn Angular', 'Sleep'],
    '2024-12-26':['Dring Coffee', 'Learn Java', 'Sleep'],
    '2024-12-15':['Dring Coffee', 'Learn View', 'Sleep'],
  };


  constructor() {
    
  }
}
