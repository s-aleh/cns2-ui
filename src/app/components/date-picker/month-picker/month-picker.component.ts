import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CfgService } from '../../../services/cfg.service';
import { Month } from '../../../models/month.model';

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
        this.cfg.getMonths();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setMonth(month: Month): void {
        if (month.enable) {
            this.cfg.curDate.setMonth(month.id);
            this.cfg.getMonths();
            this.onMonth.emit();
        }
    }

    setYear(year: number): void {
        if (this.cfg.minY < this.cfg.curDate.getFullYear() && year < 0 || this.cfg.maxY > this.cfg.curDate.getFullYear() && year > 0) {
            this.cfg.curDate.setFullYear(this.cfg.curDate.getFullYear() + year);
            this.cfg.getMonths();
            this.onYear.emit();
        }
    }

}
