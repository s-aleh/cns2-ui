import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DayPickerComponent } from './components/date-picker/day-picker/day-picker.component';
import { FromToPipe } from './pipes/from-to.pipe';
import { MonthPickerComponent } from './components/date-picker/month-picker/month-picker.component';
import { YearPickerComponent } from './components/date-picker/year-picker/year-picker.component';
import { DecadePickerComponent } from './components/date-picker/decade-picker/decade-picker.component';
import { CfgService } from './services/cfg.service';
import { FloorPipe } from './pipes/floor.pipe';

@NgModule({
    declarations: [
        AppComponent,
        DatePickerComponent,
        DayPickerComponent,
        FromToPipe,
        MonthPickerComponent,
        YearPickerComponent,
        DecadePickerComponent,
        FloorPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [CfgService],
    bootstrap: [AppComponent]
})
export class AppModule { }
