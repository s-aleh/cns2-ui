import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'day-picker',
    templateUrl: './day-picker.component.html',
    styleUrls: ['./day-picker.component.css', '../date-picker.component.css']
})
export class DayPickerComponent implements OnInit {

    @Input() view: string;
    @Input() dt: Date;
    @Input() weekdayabbr: string;
    @Input() local: string;
    @Output() onView = new EventEmitter<string>();
    @Output() onDate = new EventEmitter<number>();
    @Output() onMonth = new EventEmitter<Date>();

    datePipe: DatePipe;
    days = new Days;

    constructor(elementRef: ElementRef) {
        this.local = elementRef.nativeElement.getAttribute('local');
        this.weekdayabbr = elementRef.nativeElement.getAttribute('weekdayabbr');
    }

    ngOnInit() {
        this.datePipe = new DatePipe(this.local);
        this.days = this.getDaysInMonth();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setDay(date: number): void {
        this.dt.setDate(date);
        this.onDate.emit(date);
    }

    setMonth(month: number): void {
        this.dt.setMonth(this.dt.getMonth() + month);
        this.days = this.getDaysInMonth();
        this.onMonth.emit(this.dt);
    }

    getDaysInMonth(): Days {
        let days = new Days;
        let nextMonth = new Date();
        let prevMonth = new Date();

        nextMonth.setDate(1);
        nextMonth.setFullYear(this.dt.getFullYear());
        nextMonth.setMonth(this.dt.getMonth() + 1);
        nextMonth.setHours(0);
        nextMonth.setMinutes(0);
        nextMonth.setSeconds(0);

        prevMonth.setDate(1);
        prevMonth.setFullYear(this.dt.getFullYear());
        prevMonth.setMonth(this.dt.getMonth());
        prevMonth.setHours(0);
        prevMonth.setMinutes(0);
        prevMonth.setSeconds(0);
        prevMonth.setDate(prevMonth.getDate() - 1);

        days.prevEnd = prevMonth.getDate();
        days.prevStart = prevMonth.getDate() - prevMonth.getDay();
        days.curDays = Math.round((nextMonth.getTime() - this.dt.getTime()) / 86400000);
        days.nextEnd = 7 - nextMonth.getDay();

        if(days.curDays + days.nextEnd + days.prevEnd - days.prevStart + 1 == 35) {
            days.nextEnd += 7;
        }

        return days;
    }
}

class Days {
    prevStart: number = 0;
    prevEnd: number = 0;
    curDays: number = 0;
    nextStart: number = 1;
    nextEnd: number = 0;
}
