import { CommonModule } from '@angular/common';
import { Component, computed,  input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  DateTime, Info, Interval } from 'luxon';
import { IMeeting } from '../_share/i-meeting';

@Component({
    selector: 'app-calendar',
    imports: [RouterOutlet, CommonModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css'
})
/**
 * 1º Criação de algumas referencias de variaveis, todas usando Signal()
 */
export class CalendarComponent {
  /**Signal de Meeting via Imput() , vindo AppComponent*/
  meetings: InputSignal<IMeeting> = input.required();

  /**Temos q ter uma variavel para o dia clicado */
  activeDate: WritableSignal<DateTime | null> = signal(null);

  todayNumber: number = DateTime.now().day;
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
      return d.start;
      /* IF ou forçar a Typagem return d.start as DateTime; */
    });
  });
  /** É a formatação do tipo de dados q será colocando no html */
  DATE_MED = DateTime.DATE_MED;

  /**criaremos uma var para represente o dia de reunião, q ja temos agendado */
  activeDayMeetings: Signal<string[]> = computed(() => {
    const activeDateDay = this.activeDate();
    if (activeDateDay === null) {
      return [];
    }

    const activeDateISO = activeDateDay.toISODate();
    if (!activeDateISO ) {
      return [];
    }    
    return this.meetings()[activeDateISO]??[];

  });

 /**Criando o metodo de Previos Mes */
 goToPreviusMonth(): void {
   /**o toObject(), transforma de DateTime para DateObjectUnits */  
  const newDateObject = { ...this.firstDayOfActiveMonth().minus({ month: 1 }).toObject() };
  this.firstDayOfActiveMonth.set(newDateObject as any);
   
  //  const minusMonth = this.firstDayOfActiveMonth().minus({month: 1}).toObject();
    //console.log("Before Updated:", this.firstDayOfActiveMonth(), 'minus ', minusMonth);
   // this.firstDayOfActiveMonth().update(() => {    });  
   // console.log("After Updated:", this.firstDayOfActiveMonth());
  
  
 }
 goToNextMonth(): void {
 
  const plusMonth = this.firstDayOfActiveMonth().plus({month: 1});
  /**o toObject(), transforma de DateTime para DateObjectUnits */  
  this.firstDayOfActiveMonth().set(plusMonth.toObject());  
 }
 goToActualyMonth(): void {
 
  const todayMonth = this.today().startOf('month');
  /**o toObject(), transforma de DateTime para DateObjectUnits */  
  this.firstDayOfActiveMonth().set(todayMonth.toObject());  
 }

  constructor() {   
    // effect(() => {    
    //   this.goToPreviusMonth();
    // });
   

   
  }



}