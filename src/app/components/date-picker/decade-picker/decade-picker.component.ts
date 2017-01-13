import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

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

    @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
        event.deltaY > 0 ? this.setMillenium(100) : this.setMillenium(-100);
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
        event.deltaY > 0 ? this.setMillenium(100) : this.setMillenium(-100);
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
        event.deltaY > 0 ? this.setMillenium(100) : this.setMillenium(-100);
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