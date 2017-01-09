import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CfgService } from '../../../services/cfg.service';

@Component({
    selector: 'month-picker',
    templateUrl: './month-picker.component.html',
    styleUrls: ['./month-picker.component.css', '../date-picker.component.css']
})

export class MonthPickerComponent implements OnInit {

    @Output() onView = new EventEmitter<string>();
    @Output() onMonth = new EventEmitter();
    @Output() onYear = new EventEmitter();

    datePipe: DatePipe;

    constructor(elementRef: ElementRef, private cfg: CfgService) { }

    ngOnInit() {
        this.datePipe = new DatePipe(this.cfg.local);
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setMonth(month: number): void {
        this.cfg.curDate.setMonth(month);
        this.onMonth.emit();
    }

    setYear(year: number): void {
        this.cfg.curDate.setFullYear(this.cfg.curDate.getFullYear() + year);
        this.onYear.emit();
    }

}
