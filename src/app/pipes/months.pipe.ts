import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'months'
})

export class MonthsPipe implements PipeTransform {

    transform(value: any, type: string, local: string, ): string[] {
        let datePipe: DatePipe = new DatePipe(local);
        let date = new Date();
        let months: string[] = [];
        date.setDate(1);
       
        for(let i: number = 0; i < 12; i++) {
            date.setMonth(i);
            months.push(datePipe.transform(date, type));
        }

        return months;
    }

}
