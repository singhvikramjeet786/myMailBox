import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MymailService } from 'src/app/service/mymail.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  selectedMail:Message | undefined;
  constructor(public mymailService:MymailService) { }

  ngOnInit(): void {
    this.mymailService.getSelectedMessage().subscribe(msg=>{
      this.selectedMail = msg;
    })
  }

  deleteMessage(selectedMail:any){
    this.mymailService.setCurrentDeletedMessage(selectedMail);
  }
}
