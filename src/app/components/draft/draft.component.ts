import { Component, OnInit } from '@angular/core';
import { MymailService } from '../../service/mymail.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit {

  draftMessageList:any = [];

  constructor(public mymailService:MymailService) { }

  ngOnInit(): void {
    this.mymailService.draftMessages.subscribe(msgList =>{
      this.draftMessageList = msgList;
    })
  }

}
