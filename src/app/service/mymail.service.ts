import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Message } from '../models/message';
import msgData from '../../assets/messageDate/messageList.json';
const FETCH_INBOX_MAIL = `assets/messageData/messageList.json`;

@Injectable({
  providedIn: 'root'
})
export class MymailService {
  teashMailList:Message[] = [];
  private message = new BehaviorSubject<any>(null);
  public selectedMessage: Observable<Message>;
  private inboxUnreadCount = new BehaviorSubject<number>(0);
  public currentInboxUnreadCount: Observable<number>;
  private trashMessagesList = new BehaviorSubject<Message[]>(this.teashMailList);
  public trashMessages: Observable<Message[]>;
  private inboxMessagesList = new BehaviorSubject<Message[]>(this.teashMailList);
  public inboxMessages: Observable<Message[]>;

  private currentDeletedMessage = new BehaviorSubject<any>(null);
  public curredeletedMessage: Observable<Message>;

  constructor(public httpClient: HttpClient,) {
    this.trashMessages = this.trashMessagesList.asObservable();
    this.inboxMessages = this.inboxMessagesList.asObservable();
    this.selectedMessage = this.message.asObservable();
    this.currentInboxUnreadCount = this.inboxUnreadCount.asObservable();
    this.curredeletedMessage = this.currentDeletedMessage.asObservable();
  }

  setCurrentDeletedMessage(msg :Message){
    this.currentDeletedMessage.next(msg);
  }
  getCurrentDeletedMessage() {
    return this.currentDeletedMessage.asObservable();
  }


  setInboxUnreadCount(count:number){
    this.inboxUnreadCount.next(count);
  }
   /**
   * method to set inbox messages list
   * @param deletedmsg 
   */
    setInboxMessagesList(msgList: Message[]) {
      this.inboxMessagesList.next(msgList);
    }

    
  /**
    * method to set current Selected msg
    * @param msg 
    */
  setSelectedMessage(msg: any) {
    this.message.next(msg);
  }

  /**
   * method to get current Selected msg
   * @returns 
   */
  getSelectedMessage() {
    return this.message.asObservable();
  }

  /**
   * method to set current trash field messages list
   * @param deletedmsg 
   */
  setCurrentTrashMessages(deletedmsg: Message) {
    this.teashMailList.push(deletedmsg);
    this.trashMessagesList.next(this.teashMailList);
  }

  /**
   * method to get current trash field messages list
   * @returns 
   */
  getCurrentTrashMessageList() {
    return this.trashMessagesList.asObservable();
  }

  /**
   * get inbox emails
   * @returns 
   */
  getInboxMails(): Observable<any[]> {
    return of(msgData);

  }

}
