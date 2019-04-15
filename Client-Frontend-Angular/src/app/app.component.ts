import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

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
    websocket.onopen = ((event) => {console.log(event);
    });
  }
}
