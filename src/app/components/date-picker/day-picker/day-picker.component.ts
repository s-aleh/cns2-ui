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

    constructor(elementRef: ElementRef, private cfg: CfgService) { }

    ngOnInit() {
        this.datePipe = new DatePipe(this.cfg.local);
        this.cfg.getDays();
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
        if(this.cfg.days.prev && month < 0 || this.cfg.days.next && month > 0 ) {
            this.cfg.curDate.setMonth(this.cfg.curDate.getMonth() + month);
            this.cfg.getDays();
        }
    }

}