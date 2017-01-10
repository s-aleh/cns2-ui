import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CfgService} from '../../../services/cfg.service';

@Component({
    selector: 'year-picker',
    templateUrl: './year-picker.component.html',
    styleUrls: ['./year-picker.component.css', '../date-picker.component.css']
})

export class YearPickerComponent implements OnInit {
    
    @Output() onView = new EventEmitter<string>();
    @Output() onYear = new EventEmitter();

    decade = new Decade;
  
    constructor(private cfg: CfgService) { }

    ngOnInit() {
        this.decade = this.getDecade();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setYear(year: number): void {
        if (year >= this.cfg.mindate.getFullYear() && year <= this.cfg.maxdate.getFullYear()) {
            this.cfg.curDate.setFullYear(year);
            this.onYear.emit();
        }
    }

    setDecade(decade: number): void {
        console.log();
        if (Math.floor(this.cfg.mindate.getFullYear() / 10) < Math.floor(this.cfg.curDate.getFullYear() / 10) && decade < 0) {
            this.decade.start += decade;
            this.decade.end += decade;
        }
    }

    getDecade(): Decade {
        let decade = new Decade;
        decade.start = (this.cfg.curDate.getFullYear() - this.cfg.curDate.getFullYear() % 10) - 1;
        decade.end = decade.start + 11;
        return decade;
    }

}

class Decade {
    start: number = 0;
    end: number = 0;
}