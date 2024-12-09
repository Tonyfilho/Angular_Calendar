import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
/**
 * 1º Criação de algumas referencias de variaveis, todas usando Signal()
 */
export class CalendarComponent {
  /** hoje */
  today: Signal<DateTime> = signal(DateTime.local());

  /** A Signal with a value that can be mutated via a setter interface. 1º dia do mes, para renderizar na tela, vai ser Signal mais Writle Signal, para ter o update constante */
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));

  /** Os dias da Semana de forma Short */
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));

  /**Precisamos criar um array de dias do mes, o usaremos a o SignalComputer(), e criaremos um interval entre os dia, da disparar caso acha mudança 
   * iremos pegar o dia da semana e tb a proxima semana.
   * iremos redenrizar do inicio da semana ate o inicio do proximo mes, somente a 1º semana do mesmo.
   * precismo retornar não um Interval mas sim um Array de Dias, então usaremos o SplitBy().
   * No splitBy(), mapearesmo por dia,
   * não vai compilar ate por um IF para caso seja NUll retorne um error
  */

  dayOfMonth: Signal<DateTime[]> = computed(() => {

    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    ).splitBy({ day: 1 }).map(d => {
      if (d.start === null) {
        throw new Error('Wrong Date');
      }
      return d.start as DateTime;
      /* IF ou forçar a Typagem return d.start as DateTime; */
    });
  });
     constructor() {
      console.log('DayOfMOnth: ',  this.dayOfMonth());
      console.log('DayOfMOnth: weekDay ',  this.dayOfMonth().map(d => d.weekday));
     }



}