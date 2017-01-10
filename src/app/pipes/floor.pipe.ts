import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'floor'
})

export class FloorPipe implements PipeTransform {

    transform(value: number, div?: number): any {
        div = div == undefined ? 1 : div;
        return Math.floor(value / div);
    }

}
