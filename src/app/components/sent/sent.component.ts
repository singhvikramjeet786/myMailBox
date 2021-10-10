import { Component, OnInit } from '@angular/core';
import { MymailService } from '../../service/mymail.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

  sentMessageList:any = [];
  constructor(public mymailService:MymailService) { }

  ngOnInit(): void {
    this.mymailService.sentMessages.subscribe(msgList =>{
      this.sentMessageList = msgList;
    })
  }

}
