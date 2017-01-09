import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nameWeekdays'
})
export class NameWeekdaysPipe implements PipeTransform {

    transform(value: number, args?: number): any {

        let days = [];
       
        switch (args) {
            case 1:
                days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                break;
            default:
                days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                break;
        }

        return days;
    }

}
