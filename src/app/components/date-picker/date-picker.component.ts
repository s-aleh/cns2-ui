import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CfgService } from '../../services/cfg.service';

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css']
})

export class DatePickerComponent implements OnInit {

    @Input() date: string;
    @Output() onGetDate = new EventEmitter<string>();
    
    placeholder: string;
    curDate: Date;
    datePipe: DatePipe;

    constructor(elementRef: ElementRef, private cfg: CfgService) {
        this.placeholder = elementRef.nativeElement.getAttribute('placeholder');
        cfg.init(
            elementRef.nativeElement.getAttribute('local'),
            elementRef.nativeElement.getAttribute('monthabbr'),
            elementRef.nativeElement.getAttribute('weekdayabbr'),
            elementRef.nativeElement.getAttribute('min-date'),
            elementRef.nativeElement.getAttribute('max-date')
        );
    }

    ngOnInit() {
        this.cfg.date = new Date(this.date);
        this.datePipe = new DatePipe(this.cfg.getLocal());
        this.curDate = new Date(this.date);
        this.date = this.datePipe.transform(this.curDate, this.placeholder);
        this.cfg.curDate = new Date(this.date);
        this.cfg.curDate.setDate(1);
        this.cfg.curDate.setHours(0);
        this.cfg.curDate.setMinutes(0);
        this.cfg.curDate.setSeconds(0);
    }

    onDate() {
        this.cfg.date.setDate(this.cfg.curDate.getDate());
        this.cfg.date.setMonth(this.cfg.curDate.getMonth());
        this.cfg.date.setFullYear(this.cfg.curDate.getFullYear());
        this.date = this.datePipe.transform(this.cfg.date, this.placeholder);
        this.cfg.view = undefined;
        this.onGetDate.emit(this.date);
    }

    onMonth() {
        this.cfg.view = 'days';
    }

    onYear() {
        this.cfg.view = 'months';
    }

    onDecade() {
        this.cfg.view = 'years';
    }

    onView(view: string) {
        this.cfg.view = view;
    }

    show(): void {
        !this.cfg.view ? this.cfg.view = 'days' : this.cfg.view = undefined;
        this.cfg.curDate.setDate(1);
        this.cfg.curDate.setMonth(this.cfg.date.getMonth());
        this.cfg.curDate.setFullYear(this.cfg.date.getFullYear());
    }

}
