import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class CfgService {
    curDate: Date;
    date: Date;
    local: string;
    maxdate: Date;
    mindate: Date;
    monthabbr: string;
    months: Array<string> = [];
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
            this.months.push(datePipe.transform(date, this.monthabbr));
        }
      
    }

    getCurDate(): Date {
        return this.curDate;
    }

    setCurDate(curDate: Date): void {
        this.curDate = curDate;
    }

    getLocal(): string {
        return this.local;
    }

    getMonthAbbr(): string {
        return this.monthabbr;
    }

    getWeekdayAbbr(): string {
        return this.weekdayabbr;
    }

}
