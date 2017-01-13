import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IDate, IDateItem } from '../models/idate.interface';

@Injectable()
export class CfgService {
    curDate:        Date;
    date:           Date;
    local:          string;
    maxdate:        Date;
    mindate:        Date;
    monthabbr:      string;
    days:           IDate = { prev: false, next: false, items: [] };
    months:         IDate = { prev: false, next: false, items: [] };
    years:          IDate = { prev: false, next: false, items: [] };
    decades:        IDate = { prev: false, next: false, items: [] };
    placeholder:    string;
    weekdayabbr:    string;
    weekdays:       Array<string> = [];
    view:           string = undefined;

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
            let month: IDateItem = { id: i, name: datePipe.transform(date, this.monthabbr), enable: true };
            this.months.items.push(month);

            let year: IDateItem = { id: i, name: 0, enable: true };
            this.years.items.push(year);
        }
    }

    getDays(): void {
        this.days.items = [];

        let nextMonth = new Date(this.curDate.getFullYear(), this.curDate.getMonth() + 1, 1, 0, 0, 0, 0);
        let prevMonth = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), 1, 0, 0, 0, 0);
        prevMonth.setDate(prevMonth.getDate() - 1);
        nextMonth.setDate(1);

        this.days.prev = prevMonth >= this.mindate ? true : false;
        this.days.next = nextMonth <= this.maxdate ? true : false;

        let j: number = 0;
        for (let i: number = prevMonth.getDate() - prevMonth.getDay(); i <= prevMonth.getDate(); i++) {
            this.days.items.push({id: j, name: i, enable: false, cur: false});
            j++;
        }

        let dt = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), 1, 0, 0, 0, 0);

        for (let i: number = 1; i <= Math.round((nextMonth.getTime() - this.curDate.getTime()) / 86400000); i++) {
            dt.setDate(i);
            this.days.items.push(
                {
                    id: j,
                    name: i,
                    enable: dt < this.mindate || dt > this.maxdate ? false : true,
                    cur: this.date.getDate() == i && this.curDate.getMonth() == this.date.getMonth() && this.curDate.getFullYear() == this.date.getFullYear()
                }
            );
            j++;
        }


        for (let i: number = 1; i <= 7 - nextMonth.getDay(); i++) {
            this.days.items.push({id: j, name: i, enable: false, cur: false});
            j++;
        }

        if (this.days.items.length == 35) {
            for (let i: number = 7 - nextMonth.getDay() + 1; i <= 7 - nextMonth.getDay() + 7; i++) {
                this.days.items.push({id: j, name: i, enable: false, cur: false});
                j++;
            }
        }        
   
    }

    getMonths(): void {
        let curdate: Date = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), this.curDate.getDate(), 0, 0, 0, 0);
        let maxDMY = new Date(this.maxdate.getFullYear(), this.maxdate.getMonth(), 1, 0, 0, 0, 0);
        let minDMY = new Date(this.mindate.getFullYear(), this.mindate.getMonth(), 1, 0, 0, 0, 0);
        for (let i: number = 0; i < 12; i++) {
            curdate.setMonth(i);
            this.months.items[i].enable = curdate >= minDMY && curdate <= maxDMY ? true : false;
        }

        let prev: Date = new Date(this.curDate.getFullYear() - 1, 11, 31, 0, 0, 0, 0);
        let next: Date = new Date(this.curDate.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
        this.months.prev = prev >= this.mindate ? true : false;
        this.months.next = next <= this.maxdate ? true : false;
    }

    getYears(): void {
        let start = this.curDate.getFullYear() - this.curDate.getFullYear() % 10 - 1;
        let end = start + 10;
        
        this.years.prev = this.mindate.getFullYear() <= start ?  true : false;
        this.years.next = this.maxdate.getFullYear() >= end ? true: false;

        for (let i: number = 0; i < 12; i++) {
            this.years.items[i].name = start + i;
            this.years.items[i].enable = this.mindate.getFullYear() <= start + i && start + i <= this.maxdate.getFullYear() && i != 0 && i != 11 ? true : false;
        }
    }

    getDecades(): void {
        this.decades.items = [];

        let prev: Date = new Date(this.curDate.getFullYear() - this.curDate.getFullYear() % 100, 0, 1, 0, 0, 0, 0);
        let next: Date = new Date(prev.getFullYear() + 99, 11, 31, 0, 0, 0, 0);
        this.decades.prev = prev > this.mindate ? true : false;
        this.decades.next = next < this.maxdate ? true : false;
        this.decades.title = prev.getFullYear() + '- ' + next.getFullYear();

        let j: number = 0;
        if (this.decades.prev) {
            this.decades.items.push({
                id: j,
                name: (prev.getFullYear() - 10) + '- ' + (prev.getFullYear() - 1),
                enable: false,
                start: prev.getFullYear() - 10,
                end: prev.getFullYear() - 1
            });
            j++;
        }

        for (let i: number = prev.getFullYear(); i < next.getFullYear(); i += 10) {
            this.decades.items.push({
                id: j,
                name: i + '- ' + (i + 9),
                enable: this.mindate.getFullYear() >= i && this.mindate.getFullYear() <= i + 9 ||
                        i <= this.maxdate.getFullYear() && this.maxdate.getFullYear() <= i + 9 ||
                        i >= this.mindate.getFullYear() && i + 9 <= this.maxdate.getFullYear() ? true : false,
                start: i,
                end: i + 9
            });
            j++;
        }

        if (this.decades.next) {
            this.decades.items.push({
                id: j,
                name: (next.getFullYear() + 1) + '- ' + (next.getFullYear() + 10),
                enable: false,
                start: next.getFullYear() + 1,
                end: next.getFullYear() + 10
            });
            j++;
        } 
    }

    getLocal(): string {
        return this.local;
    }

}
