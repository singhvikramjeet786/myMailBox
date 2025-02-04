import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MymailService } from 'src/app/service/mymail.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  inboxMessageList:Message[] = [];
  constructor(public mymailService:MymailService) { 

  }

  ngOnInit(): void {
    if(this.inboxMessageList.length == 0 ){
      //fetching all emails
      this.mymailService.getInboxMails().subscribe(msgList=>{
        this.inboxMessageList = msgList;
        let count = 0;
        this.inboxMessageList.forEach((msg,index)=>{
          //counting no of unread emails
          if(!msg.isRead){
            count++;
          }
        });
        this.mymailService.setInboxUnreadCount(count);
        this.mymailService.setInboxMessagesList(msgList);
      });
    }
    this.mymailService.getCurrentDeletedMessage().subscribe((deletedMsg:Message)=>{
      this.inboxMessageList?.forEach((msg,index)=>{
        if(msg.id==deletedMsg?.id){
          this.inboxMessageList.splice(index,1);
          deletedMsg.isSelected = false;
          this.mymailService.setCurrentTrashMessages(deletedMsg);
          this.mymailService.setSelectedMessage(null);

        };
      });
    });
  }

}
