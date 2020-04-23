import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { JournalComponent } from './journal/journal.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventDialogComponent } from './event-dialog/event-dialog.component'; // for FullCalendar!


@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    EventDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    FullCalendarModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [],
  entryComponents: [
    EventDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
