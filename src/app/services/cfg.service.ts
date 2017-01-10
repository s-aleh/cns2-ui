import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Month } from '../models/month.model';

@Injectable()
export class CfgService {
    curDate: Date;
    date: Date;
    local: string;
    maxdate: Date;
    mindate: Date;
    maxDMY: Date;
    minDMY: Date;
    maxY: number;
    minY: number;
    monthabbr: string;
    months: Array<Month> = [];
    placeholder: string;
    weekdayabbr: string;
    weekdays: Array<string> = [];
    view: string = undefined;

    constructor() { }

    init(local: string, monthabbr: string, weekdayabbr: string, mindate?: string, maxdate?: string): void {
        this.local = local;
        this.monthabbr = monthabbr;
        this.weekdayabbr = weekdayabbr;
        this.maxdate = maxdate.length > 0 ? new Date(maxdate) : new Date('12/31/2099');
        this.mindate = mindate.length > 0 ? new Date(mindate) : new Date('01/01/1900');
        this.maxDMY = new Date(this.maxdate.getFullYear(), this.maxdate.getMonth(), 1, 0, 0, 0, 0);
        this.minDMY = new Date(this.mindate.getFullYear(), this.mindate.getMonth(), 1, 0, 0, 0, 0);
        this.maxY = this.maxdate.getFullYear();
        this.minY = this.mindate.getFullYear();

        let date: Date = new Date("01/01/2017");
        let datePipe: DatePipe = new DatePipe(this.local);
        let t = this.weekdayabbr == "EE" ? "EEE" : this.weekdayabbr;
       
        for(let i: number = 1; i < 8; i++) {
            date.setDate(i);
            if (this.weekdayabbr == "EE") {
                this.weekdays.push(datePipe.transform(date, t).substring(0, 2));
            } else {
                this.weekdays.push(datePipe.transform(date, t));
            }
        }
       
        for(let i: number = 0; i < 12; i++) {
            date.setMonth(i);
            this.months.push(new Month(i, datePipe.transform(date, this.monthabbr), true));
        }
      
    }

    getMonths(): void {
        let curdate: Date = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), this.curDate.getDate(), 0, 0, 0, 0);
        for (let i = 0; i < 12; i++) {
            curdate.setMonth(i);
            this.months[i].enable = curdate >= this.minDMY && curdate <= this.maxDMY ? true : false;
        }
    }

    getLocal(): string {
        return this.local;
    }

}
