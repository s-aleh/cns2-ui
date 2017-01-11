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

    constructor(private cfg: CfgService) { }

    ngOnInit() {
        this.cfg.getDecades();
    }

    onSetView(view: string): void {
        this.onView.emit(view);
    }

    setDecade(decade: number) {
        this.cfg.curDate.setFullYear(decade);
        this.onDecade.emit();
    }

    setMillenium(millenium: number) {
        if (this.cfg.decades.prev && millenium < 0 || this.cfg.decades.next && millenium > 0) {
            this.cfg.curDate.setFullYear(this.cfg.curDate.getFullYear() + millenium);
            this.cfg.getDecades();
        }
    }

}