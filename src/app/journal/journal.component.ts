import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, interactionPlugin]; // important!

  calendarOptions = {
    height: 'parent'
  };

  safeWindowDays = 14;

  calendarEvents = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('events') == null) {
      const emptyList = [];
      localStorage.setItem('events', JSON.stringify(emptyList));
    }
    this.calendarEvents = JSON.parse(localStorage.getItem('events'));
  }

  ngAfterViewInit(): void {
    let calendarApi = this.calendarComponent.getApi();

    // calendarApi.setOption('header', {
    //   left: '',
    //   center: 'prev title next',
    //   right: ''
    // });
  }

  dayRender(arg) {
    const el: HTMLElement = arg.el;
    const renderingDate = moment(arg.date);
    const today = moment().startOf('day');

    const difference = renderingDate.diff(today, 'days');

    if (difference <= -this.safeWindowDays) {
      el.classList.add('safe-zone');
    } else if (difference > -this.safeWindowDays && difference <= 0) {
      el.classList.add('watch-zone');
    }
  }

  safeWindowDaysChanged() {
    let calendarApi = this.calendarComponent.getApi();
    // calendarApi.destroy();
    calendarApi.render();
  }

  addEvent(evt) {
    const eventInfo = {
      id: uuidv4(),
      title: '',
      date: moment(evt?.date).format('YYYY-MM-DD'),
    };

    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        IsAdd: true,
        Event: eventInfo
      }
      // position: {
      //   top: '55px',
      //   right: '20px'
      // }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.Status === 'ADD') {

        this.calendarEvents.push(result.Event);
        localStorage.setItem('events', JSON.stringify(this.calendarEvents));
      }
    });
  }

  editEvent(evt) {
    const eventInfo = {
      id: evt?.event.id,
      title: evt?.event.title,
      date: moment(evt?.event.start).format('YYYY-MM-DD'),
    };

    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        IsAdd: false,
        Event: eventInfo,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.Status === 'UPDATE') {

        this.calendarEvents.forEach(event => {
          if (event.id === result.Event.id) {
            event.title = result.Event.title;
          }
        });

        localStorage.setItem('events', JSON.stringify(this.calendarEvents));
      } else if (result.Status === 'DELETE') {
        const toDeleteIndex = this.calendarEvents.findIndex(event => event.id === result.Event.id);
        this.calendarEvents.splice(toDeleteIndex, 1);

        localStorage.setItem('events', JSON.stringify(this.calendarEvents));
      }
    });
  }
}
