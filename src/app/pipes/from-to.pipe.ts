import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromTo'
})
export class FromToPipe implements PipeTransform {

    transform(end: number, start: number, step?: number): number[] {
        step = step == undefined ? 1 : step;
        let res = [];
        for (let i = start; i <= end; i += step) {
            res.push(i);
        }
        return res;
    }
}
