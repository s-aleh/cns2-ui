import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'nameWeekdays'
})
export class NameWeekdaysPipe implements PipeTransform {

    transform(value: any, type: string, local: string): any {

        let days: string[] = [];
        let date: Date = new Date("01/01/2017");
        let datePipe: DatePipe = new DatePipe(local);
        let t = type == "EE" ? "EEE" : type;
       
        for(let i: number = 1; i < 8; i++) {
            date.setDate(i);
            if (type == "EE") {
                days.push(datePipe.transform(date, t).substring(0, 2));
            } else {
                days.push(datePipe.transform(date, t));
            }
        }

        return days;
    }

}
