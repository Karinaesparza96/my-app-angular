import { Component } from '@angular/core';
import { MessageService } from 'src/app/components/messages/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  constructor(public messageService: MessageService){
    //public porque você vai ser usado no template html
  }
}
