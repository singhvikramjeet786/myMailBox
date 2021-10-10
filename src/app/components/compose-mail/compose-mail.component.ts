import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrls: ['./compose-mail.component.scss']
})
export class ComposeMailComponent implements OnInit {

  // mailData:string = '';
  mailData: FormGroup = new FormGroup({
    // name: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEXP)]),
    from: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEXP)]),
    subject: new FormControl('', Validators.required),
    body: new FormControl('', [Validators.required])
  });

  constructor(  public dialogRef: MatDialogRef<ComposeMailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onSubmitClick(type:string): void {
    this.mailData.addControl("messageDeliveryDate",new FormControl(new Date().toISOString(),
                              [Validators.required]));
    this.dialogRef.close({
      type:type,
      data: this.mailData
    });
  }
  

}
