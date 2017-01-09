import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CfgService } from '../../../services/cfg.service';

@Component({
    selector: 'day-picker',
    templateUrl: './day-picker.component.html',
    styleUrls: ['./day-picker.component.css', '../date-picker.component.css']
})

export class DayPickerComponent implements OnInit {

    @Output() onView = new EventEmitter();
    @Output() onDate = new EventEmitter();
    @Output() onMonth = new EventEmitter();

    datePipe: DatePipe;
    days: Array<Days> = [];

    constructor(elementRef: ElementRef, private cfg: CfgService) { }

    ngOnInit() {
        this.datePipe = new DatePipe(this.cfg.local);
        this.getDaysInMonth();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setDay(date: number, enable: boolean): void {
        if (enable) {
            this.cfg.curDate.setDate(date);
            this.onDate.emit();
        }
    }

    setMonth(month: number): void {
        this.cfg.curDate.setMonth(this.cfg.curDate.getMonth() + month);
        this.getDaysInMonth();
        this.onMonth.emit(this.cfg.curDate);
    }

    getDaysInMonth(): void {
        let days: Array<Days> = [];
        let nextMonth = new Date();
        let prevMonth = new Date();

        nextMonth.setDate(1);
        nextMonth.setFullYear(this.cfg.curDate.getFullYear());
        nextMonth.setMonth(this.cfg.curDate.getMonth() + 1);
        nextMonth.setHours(0);
        nextMonth.setMinutes(0);
        nextMonth.setSeconds(0);

        prevMonth.setDate(1);
        prevMonth.setFullYear(this.cfg.curDate.getFullYear());
        prevMonth.setMonth(this.cfg.curDate.getMonth());
        prevMonth.setHours(0);
        prevMonth.setMinutes(0);
        prevMonth.setSeconds(0);
        prevMonth.setDate(prevMonth.getDate() - 1);

        this.days = [];
        for (let i:number = prevMonth.getDate() - prevMonth.getDay(); i <= prevMonth.getDate(); i++) {
            this.days.push(new Days(i, false, false));
        }

        for (let i:number = 1; i <= Math.round((nextMonth.getTime() - this.cfg.curDate.getTime()) / 86400000); i++) {
            this.days.push(new Days(i, true, this.cfg.date.getDate() == i && this.cfg.curDate.getMonth() == this.cfg.date.getMonth() && this.cfg.curDate.getFullYear() == this.cfg.date.getFullYear()));
        }

        for (let i:number = 1; i <= 7 - nextMonth.getDay(); i++) {
            this.days.push(new Days(i, false, false));
        }

        if (this.days.length == 35) {
            for (let i:number = 7 - nextMonth.getDay() + 1; i <= 7 - nextMonth.getDay() + 7; i++) {
                this.days.push(new Days(i, false, false));
            }
        }
    }
}

class Days {
    date: number;
    enable: boolean = false;
    cur: boolean = false;

    constructor(date: number, enable: boolean, cur: boolean) {
        this.date = date;
        this.enable = enable;
        this.cur = cur;
    }
}
