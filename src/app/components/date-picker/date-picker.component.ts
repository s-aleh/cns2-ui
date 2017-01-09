import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

    @Input() view: string;
    @Input() date: string;
    @Input() dt: Date;
    @Output() onGetDate = new EventEmitter<string>();
    
    local: string;
    weekdayabbr: string;
    monthabbr: string;
    placeholder: string;
    curDate: Date;
    datePipe: DatePipe;

    constructor(elementRef: ElementRef) {
        this.placeholder = elementRef.nativeElement.getAttribute('placeholder');
        this.local = elementRef.nativeElement.getAttribute('local');
        this.weekdayabbr = elementRef.nativeElement.getAttribute('weekdayabbr');
        this.monthabbr = elementRef.nativeElement.getAttribute('monthabbr');
        this.view = undefined;
    }

    ngOnInit() {
        this.datePipe = new DatePipe(this.local);
        this.curDate = new Date(this.date);
        this.date = this.datePipe.transform(this.curDate, this.placeholder);
        this.dt = new Date(this.date);
        this.dt.setDate(1);
        this.dt.setHours(0);
        this.dt.setMinutes(0);
        this.dt.setSeconds(0);
    }

    onDate(date: Date) {
        this.curDate.setDate(this.dt.getDate());
        this.curDate.setMonth(this.dt.getMonth());
        this.curDate.setFullYear(this.dt.getFullYear());
        this.date = this.datePipe.transform(this.curDate, this.placeholder);
        this.view = undefined;
        this.onGetDate.emit(this.date);
    }

    onMonth(dt: Date) {
        this.dt = dt;
        this.view = 'days';
    }

    onYear(dt: Date) {
        this.dt = dt;
        this.view = 'months';
    }

    onDecade(dt: Date) {
        this.dt = dt;
        this.view = 'years';
    }

    onView(view: string) {
        this.view = view;
    }

    show(): void {
        !this.view ? this.view = 'days' : this.view = undefined;
        this.dt.setDate(1);
        this.dt.setMonth(this.curDate.getMonth());
        this.dt.setFullYear(this.curDate.getFullYear());
    }

}
