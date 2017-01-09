import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'decade-picker',
    templateUrl: './decade-picker.component.html',
    styleUrls: ['./decade-picker.component.css', '../date-picker.component.css']
})
export class DecadePickerComponent implements OnInit {

    @Input() view: string;
    @Input() dt: Date;
    @Output() onView = new EventEmitter<string>();
    @Output() onDecade = new EventEmitter<Date>();

    millenium = new Millenium;

    constructor() { }

    ngOnInit() {
        this.millenium = this.getMillenium();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setDecade(decade: number) {
        this.dt.setFullYear(decade);
        this.onDecade.emit(this.dt);
    }

    setMillenium(millenium: number) {
        this.dt.setFullYear(this.dt.getFullYear() + millenium);
        this.millenium = this.getMillenium();
    }

    getMillenium(): Millenium {
        let millenium = new Millenium;
        millenium.start = (this.dt.getFullYear() - this.dt.getFullYear() % 100) - 1;
        millenium.end = millenium.start + 100;
        return millenium;
    }
}

class Millenium {
    start: number = 2000;
    end: number = 2099;
}