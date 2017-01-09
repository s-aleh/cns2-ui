import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'months'
})

export class MonthsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
        let months = [];
       
        switch (args) {
            case 1:
                months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                break;
            default:
                months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
        }

        return months;
  }

}
