import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CfgService} from '../../../services/cfg.service';

@Component({
    selector: 'decade-picker',
    templateUrl: './decade-picker.component.html',
    styleUrls: ['./decade-picker.component.css', '../date-picker.component.css']
})

export class DecadePickerComponent implements OnInit {

    @Output() onView = new EventEmitter<string>();
    @Output() onDecade = new EventEmitter();

    millenium = new Millenium;

    constructor(private cfg: CfgService) { }

    ngOnInit() {
        this.millenium = this.getMillenium();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setDecade(decade: number) {
        this.cfg.curDate.setFullYear(decade);
        this.onDecade.emit();
    }

    setMillenium(millenium: number) {
        this.cfg.curDate.setFullYear(this.cfg.curDate.getFullYear() + millenium);
        this.millenium = this.getMillenium();
    }

    getMillenium(): Millenium {
        let millenium = new Millenium;
        millenium.start = (this.cfg.curDate.getFullYear() - this.cfg.curDate.getFullYear() % 100) - 1;
        millenium.end = millenium.start + 100;
        return millenium;
    }
}

class Millenium {
    start: number = 2000;
    end: number = 2099;
}