import { Component, OnInit, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CfgService } from '../../../services/cfg.service';
import { IDateItem } from '../../../models/idate.interface';

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

    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
        event.deltaY > 0 ? this.setYear(1) : this.setYear(-1);
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
        event.deltaY > 0 ? this.setYear(1) : this.setYear(-1);
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
        event.deltaY > 0 ? this.setYear(1) : this.setYear(-1);
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setMonth(month: IDateItem): void {
        if (month.enable) {
            this.cfg.curDate.setMonth(month.id);
            this.cfg.getMonths();
            this.onMonth.emit();
        }
    }

    setYear(year: number): void {
        if (this.cfg.months.prev && year < 0 || this.cfg.months.next && year > 0) {
            this.cfg.curDate.setFullYear(this.cfg.curDate.getFullYear() + year);
            this.cfg.getMonths();
            this.onYear.emit();
        }
    }

}
