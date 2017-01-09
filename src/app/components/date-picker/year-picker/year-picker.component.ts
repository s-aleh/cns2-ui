import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'year-picker',
    templateUrl: './year-picker.component.html',
    styleUrls: ['./year-picker.component.css', '../date-picker.component.css']
})
export class YearPickerComponent implements OnInit {

    @Input() view: string;
    @Input() dt: Date;
    @Output() onView = new EventEmitter<string>();
    @Output() onYear = new EventEmitter<Date>();

    decade = new Decade;
  
    constructor() { }

    ngOnInit() {
        this.decade = this.getDecade();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setYear(year: number): void {
        this.dt.setFullYear(year);
        this.onYear.emit(this.dt);
    }

    setDecade(decade: number): void {
        this.decade.start += decade;
        this.decade.end += decade;
    }

    getDecade(): Decade {
        let decade = new Decade;
        decade.start = (this.dt.getFullYear() - this.dt.getFullYear() % 10) - 1;
        decade.end = decade.start + 11;
        return decade;
    }

}

class Decade {
    start: number = 0;
    end: number = 0;
}