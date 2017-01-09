import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'month-picker',
    templateUrl: './month-picker.component.html',
    styleUrls: ['./month-picker.component.css', '../date-picker.component.css']
})
export class MonthPickerComponent implements OnInit {

    @Input() view: string;
    @Input() dt: Date;
    @Input() local: string;
    @Input() monthabbr: string;
    @Output() onView = new EventEmitter<string>();
    @Output() onMonth = new EventEmitter<Date>();
    @Output() onYear = new EventEmitter<Date>();

    datePipe: DatePipe;

    constructor(elementRef: ElementRef) {
        this.local = elementRef.nativeElement.getAttribute('local');
        this.monthabbr = elementRef.nativeElement.getAttribute('monthabbr');
    }

    ngOnInit() {
        this.datePipe = new DatePipe(this.local);
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setMonth(month: number): void {
        this.dt.setMonth(month);
        this.onMonth.emit(this.dt);
    }

    setYear(year: number): void {
        this.dt.setFullYear(this.dt.getFullYear() + year);
        this.onYear.emit(this.dt);
    }

}
