import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JournalComponent } from '../journal/journal.component';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<JournalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close({
      Status: this.data.IsAdd ? 'ADD' : 'UPDATE',
      Event: this.data.Event,
    });
  }

  cancel() {
    this.dialogRef.close({
      Status: 'CANCEL',
    });
  }

  delete() {
    this.dialogRef.close({
      Status: 'DELETE',
      Event: this.data.Event
    });
  }

}
