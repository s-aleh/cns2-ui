import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

import { CfgService} from '../../../services/cfg.service';

@Component({
    selector: 'year-picker',
    templateUrl: './year-picker.component.html',
    styleUrls: ['./year-picker.component.css', '../date-picker.component.css']
})

export class YearPickerComponent implements OnInit {
    
    @Output() onView = new EventEmitter<string>();
    @Output() onYear = new EventEmitter();

    constructor(private cfg: CfgService) { }

    ngOnInit() {
        this.cfg.getYears();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
        event.deltaY > 0 ? this.setDecade(10) : this.setDecade(-10);
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
        event.deltaY > 0 ? this.setDecade(10) : this.setDecade(-10);
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
        event.deltaY > 0 ? this.setDecade(10) : this.setDecade(-10);
    }
    
    setYear(year: number): void {
        if (year >= this.cfg.mindate.getFullYear() && year <= this.cfg.maxdate.getFullYear()) {
            this.cfg.curDate.setFullYear(year);
            this.onYear.emit();
        }
    }

    setDecade(decade: number): void {
        if (decade < 0 && this.cfg.years.prev || decade > 0 && this.cfg.years.next) {
            this.cfg.curDate.setFullYear(this.cfg.curDate.getFullYear() + decade);
            this.cfg.getYears();
        }
    }

}