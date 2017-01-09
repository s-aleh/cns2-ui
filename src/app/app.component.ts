import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Datepicker';
    @Input() mydate: string = "01/06/2017";

    onGetDate(date: string) {
        this.mydate = date;
    }
}
