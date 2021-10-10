import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Sidenavbar } from '../models/sidenavbar';
import { MymailService } from '../service/mymail.service';
import { Message } from '../models/message';
import { MatDialog } from '@angular/material/dialog';
import { ComposeMailComponent } from '../components/compose-mail/compose-mail.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  menuBar:Array<Sidenavbar> = [
    {fieldName:'Inbox',icon:'fa-inbox',path:'./inbox',count:5,isSelected:true},
    {fieldName:'Sent',icon:'fa-paper-plane',path:'./sent',count:0,isSelected:false},
    {fieldName:'Draft',icon:'fa-pencil-square-o',path:'./draft',count:0,isSelected:false},
    {fieldName:'Trash',icon:'fa-trash',path:'./trash',count:0,isSelected:false},
    {fieldName:'Archive',icon:'fa-trash',path:'./trash',count:0,isSelected:false},
  ]

  DraftMailList:Message[] = [];
  SentMailList:Message[] = [];

  constructor(public mymailService:MymailService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.mymailService.currentInboxUnreadCount.subscribe(count=>{
      this.menuBar.map(menu => menu.fieldName == 'Inbox'?menu.count = count:'');
    });
    this.mymailService.getCurrentTrashMessageList().subscribe(messageList=>{
      this.menuBar.map(menu => {if(menu.fieldName == 'Trash')menu.count = messageList.length});
    });
  }

  resetSelectedMessage(){
    this.mymailService.setSelectedMessage(null);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ComposeMailComponent, {
      width: '80vw',
      // data: { name: "Vikram", city: "Amritsar" }
    });
    dialogRef.afterClosed().subscribe(result => {
      let message: Message = {} as Message;
      message.id = new Date().getTime().toString();
      message.sentBy = result.data.value.from;
      message.messageTitle = result.data.value.subject;
      message.messageBody = result.data.value.body;
      message.messageDeliveryDate = result.data.value.messageDeliveryDate;
      message.isSelected = false;
      message.isRead = false;
      if (result.type == "Save") {
        this.DraftMailList.push(message);
        this.menuBar.forEach(menu=> {
          menu.fieldName == 'Draft'? menu.count = this.DraftMailList.length:''
        });
        this.mymailService.setDraftMessagesList(this.DraftMailList);
      }
      else if (result.type == "Send") {
        this.SentMailList.push(message);
        this.menuBar.forEach(menu=> {
          menu.fieldName == 'Sent'? menu.count = this.SentMailList.length:''
        });
        this.mymailService.setSentMessagesList(this.SentMailList);
      }
      console.log(this.DraftMailList, this.SentMailList)
    });
  }
}
