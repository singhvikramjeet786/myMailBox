import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MymailService } from 'src/app/service/mymail.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 
  isRead:boolean =  true;
  isactive:boolean = true;
  @Input() msgList: Message[] = [];
  
  constructor(public mymailService:MymailService,private route: Router) { }

  ngOnInit(): void {
    this.msgList.forEach(msg=>msg.isSelected?this.mymailService.setSelectedMessage(msg):'');
  }

  selectedMessage(message:Message){
    
    if(!message.isRead){
      message.isRead = true;
      let deletecmsg = 0;
      let count = this.mymailService.getcurrentInboxUnreadCount();
        console.log(count);
        deletecmsg = count-1;
        
      if(this.route.url.indexOf('/inbox') > -1){
        this.mymailService.setInboxUnreadCount(deletecmsg);
      }
    }
    let count = 0;
    // this.msgList[index].isSelected =

    this.msgList.forEach((msg,index)=>{
      msg.id==message.id?msg.isSelected = true : msg.isSelected = false
      // if(!msg.isRead){
      //   count++;
      // }
    });
    // if(this.route.url.indexOf('/inbox') > -1){
    //   this.mymailService.setInboxUnreadCount(count);
    // }
    this.mymailService.setSelectedMessage(message);

  }
}
