import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'client-frontend-angular';

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    const websocket = this.httpService.connectWebsocket();
    const client = Stomp.over(websocket);
    client.connect({}, function(frame) {
    client.subscribe('/update-items', function (message) {
        this.showMessage(JSON.parse(message.body));
    });
    //client.send("/update-items", {}, "My first messages <3");
});
  }
}
