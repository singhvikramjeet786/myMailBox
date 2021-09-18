import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MymailService } from 'src/app/service/mymail.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  trashMessageList:Message[] = [];
  constructor(public mymailService:MymailService) { 

  }

  ngOnInit(): void {
    if(this.trashMessageList.length == 0){
      this.mymailService.getCurrentTrashMessageList().subscribe(msgList=>{
        this.trashMessageList = msgList;
      });
    }
  }

}
