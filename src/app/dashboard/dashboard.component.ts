import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Sidenavbar } from '../models/sidenavbar';
import { MymailService } from '../service/mymail.service';
import { Message } from '../models/message';


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
  ]

  constructor(public mymailService:MymailService) {}

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
}
